import type { VocabularySectionInfo } from '../types/question';

export const VOCAB_SECTIONS: VocabularySectionInfo[] = [
  {
    id: 'section-01',
    number: 1,
    title: 'Programming Basics',
    description: 'Function, Class, Object, Variable, Null, API, Library — the foundation everything else builds on',
  },
  {
    id: 'section-02',
    number: 2,
    title: 'Tools & The Build System',
    description: 'Framework, Runtime, IDE, SDK, Debugging/Logcat, Gradle, Module, Dependency',
  },
  {
    id: 'section-03',
    number: 3,
    title: 'Project Structure & Screens',
    description: 'APK, Manifest, Package, Resource, XML, Activity, Service',
  },
  {
    id: 'section-04',
    number: 4,
    title: 'Components Talking to Each Other',
    description: 'BroadcastReceiver, Context, Intent, PendingIntent, View, Composable, Layout, State',
  },
  {
    id: 'section-05',
    number: 5,
    title: 'UI & Data',
    description: 'Recomposition, ViewModel, Database, Flow/StateFlow, Lifecycle, Permission, Process',
  },
  {
    id: 'section-06',
    number: 6,
    title: 'Background Work & Concurrency',
    description: 'Notification, Back Stack, Thread, UI Thread, Coroutine, Suspend function, Dispatcher, WorkManager',
  },
];
