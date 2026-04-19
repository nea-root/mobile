import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

// Define the TypeScript interface that corresponds to the native module
export interface Spec extends TurboModule {
  getEnv: () => string | null; // Adjust type based on expected constants
}

// Register the TurboModule interface
export default TurboModuleRegistry.getEnforcing<Spec>('NativeRNConfig') as Spec;
