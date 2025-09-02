import * as migration_20250902_043954_initial_setup from './20250902_043954_initial_setup';

export const migrations = [
  {
    up: migration_20250902_043954_initial_setup.up,
    down: migration_20250902_043954_initial_setup.down,
    name: '20250902_043954_initial_setup'
  },
];
