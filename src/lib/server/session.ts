import { supabase } from "$lib/supabaseClient.js";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import type { RequestEvent } from "@sveltejs/kit";

// creates a randomised session token
export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

// creates a new session storing the token, id and expiration
export async function createSession(token: string, userId: number): Promise<Session> {

	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};

  await supabase.from('user_sessions').insert({id: session.id, user_id: session.userId, expires_at: session.expiresAt});

	return session;
}

// validate the session checking it exists and is not expired
// will also extend the expiration date to persist sessions when <15 days remaining
export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));


  const row = await supabase.from('user_sessions').select().eq('id', sessionId).single()

	if (row === null || row.error) {
		return { session: null, user: null };
	}
	const session: Session = {
		id: row.data.id,
		userId: row.data.user_id,
		expiresAt: row.data.expires_at
	};

  const userRow = await supabase.from('users').select().eq('id', row.data.user_id).single();

  if (userRow === null || userRow.error) {
    return { session: null, user: null }
  }

	const user: User = {
		id: row.data.user_id,
    username: userRow.data.username,
	};
	if (Date.now() >= new Date(session.expiresAt).getTime()) {
    await supabase.from('user_sessions').delete().eq('id', sessionId);

		return { session: null, user: null };
	}
	if (Date.now() >= new Date(session.expiresAt).getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    await supabase.from('user_sessions').update({ expires_at: session.expiresAt }).eq('id', session.id);
	}
	return { session, user };
}

// invalidate a single session
export async function invalidateSession(sessionId: string): Promise<void> {
  await supabase.from('user_sessions').delete().eq('id', sessionId);
}

// invalidate all of a users sessions
export async function invalidateAllSessions(userId: number): Promise<void> {
  await supabase.from('user_sessions').delete().eq('user_id', userId);
}

// set the session cookie on the browser
export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set("session", token, {
		httpOnly: true,
		sameSite: "lax",
		expires: new Date(expiresAt),
		path: "/"
	});
}

// delete session cookie from browser
export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set("session", "", {
		httpOnly: true,
		sameSite: "lax",
		maxAge: 0,
		path: "/"
	});
}

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };

export interface Session {
	id: string;
	userId: number;
	expiresAt: Date;
}

export interface User {
	id: number;
  username: string;
  email?: string;
  password?: string;
}