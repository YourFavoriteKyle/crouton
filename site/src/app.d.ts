// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	import { SupabaseClient, Session } from '@supabase/supabase-js';
	import { Database } from './DatabaseDefinitions';

	// interface Error {}
	interface Locals {
		supabase: SupabaseClient<Database>;
		getSession(): Promise<Session | null>;
	}
	interface PageData {
		session: Session | null;
	}
	// interface Platform {}
}
