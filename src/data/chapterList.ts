import type { ChapterInfo } from '../types/question';

export const CHAPTERS: ChapterInfo[] = [
  { id: 'ch-01', number: 1,  title: 'Project Structure',              folder: 'ch-01-project-structure',  description: '`app/`, `res/`, `AndroidManifest.xml`, `build.gradle.kts` — the shape every Android project shares' },
  { id: 'ch-02', number: 2,  title: 'The Manifest',                   folder: 'ch-02-the-manifest',        description: '`AndroidManifest.xml` — declares every component, permission, and intent filter; nothing runs without it' },
  { id: 'ch-03', number: 3,  title: 'Activity',                       folder: 'ch-03-activity',            description: "Android's entry point — declared in the manifest, launched by the OS, hosts the UI via `setContent {}`" },
  { id: 'ch-04', number: 4,  title: 'Compose Bootstrap',               folder: 'ch-04-compose-bootstrap',   description: 'Borrowed scaffolding — just enough Compose to have screens for the rest of the book' },
  { id: 'ch-05', number: 5,  title: 'Lifecycle',                      folder: 'ch-05-lifecycle',           description: '`onCreate → onResume → onPause → onDestroy` — the OS controls your states; rotation destroys and recreates' },
  { id: 'ch-06', number: 6,  title: 'Intents',                        folder: 'ch-06-intents',             description: 'How components find and talk to each other — explicit (named target) and implicit (OS resolves)' },
  { id: 'ch-07', number: 7,  title: 'Coroutines',                     folder: 'ch-07-coroutines',          description: "Android's async model — `suspend`, `launch`, `Dispatchers`; never block the main thread" },
  { id: 'ch-08', number: 8,  title: 'Services',                       folder: 'ch-08-services',            description: 'Work that outlives a screen — foreground service stays alive with a persistent notification' },
  { id: 'ch-09', number: 9,  title: 'BroadcastReceiver',              folder: 'ch-09-broadcast-receiver',  description: 'React to system-wide events — boot completed, package installed, network changed' },
  { id: 'ch-10', number: 10, title: 'Permissions',                    folder: 'ch-10-permissions',         description: 'Normal vs. dangerous permissions — runtime request flow, handling denial gracefully' },
  { id: 'ch-11', number: 11, title: 'Data Persistence',               folder: 'ch-11-data-persistence',    description: 'DataStore for key-value pairs, Room for structured data — both coroutine-native' },
  { id: 'ch-12', number: 12, title: 'PackageManager + System Services', folder: 'ch-12-system-services',   description: '`getSystemService()` — query installed apps, post notifications, access OS capabilities' },
  { id: 'ch-13', number: 13, title: 'WorkManager',                    folder: 'ch-13-workmanager',         description: 'Reliable deferred/periodic work — survives restarts, supports constraints' },
];
