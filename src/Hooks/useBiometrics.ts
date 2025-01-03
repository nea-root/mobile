import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { useState } from 'react';

interface BiometricsResult {
  available: boolean;
  biometryType?: string;
  error?: string;
}

interface CreateSignatureOptions {
  promptMessage: string;
  payload: string;
}

interface SignatureResult {
  success: boolean;
  signature?: string;
  error?: string;
}

export function useBiometrics() {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [biometryType, setBiometryType] = useState<string | undefined>(undefined);

  const checkBiometricsAvailability = async (): Promise<BiometricsResult> => {
    const rnBiometrics = new ReactNativeBiometrics();
    try {
      const result = await rnBiometrics.isSensorAvailable();
      setIsAvailable(result.available);
      setBiometryType(result.biometryType);
      return result;
    } catch (error) {
      console.error('Error checking biometrics availability:', error);
      return { available: false, error: String(error) };
    }
  };

  const createKeys = async (): Promise<string | null> => {
    const rnBiometrics = new ReactNativeBiometrics();
    try {
      const result = await rnBiometrics.createKeys();
      return result.publicKey;
    } catch (error) {
      console.error('Error creating keys:', error);
      return null;
    }
  };

  const createSignature = async (options: CreateSignatureOptions): Promise<SignatureResult> => {
    const rnBiometrics = new ReactNativeBiometrics();
    try {
      const result = await rnBiometrics.createSignature(options);
      return result;
    } catch (error) {
      console.error('Error creating signature:', error);
      return { success: false, error: String(error) };
    }
  };

  const deleteKeys = async (): Promise<boolean> => {
    const rnBiometrics = new ReactNativeBiometrics();
    try {
      const result = await rnBiometrics.deleteKeys();
      return result.keysDeleted;
    } catch (error) {
      console.error('Error deleting keys:', error);
      return false;
    }
  };

  const biometricKeysExist = async (): Promise<boolean> => {
    const rnBiometrics = new ReactNativeBiometrics();
    try {
      const result = await rnBiometrics.biometricKeysExist();
      return result.keysExist;
    } catch (error) {
      console.error('Error checking if biometric keys exist:', error);
      return false;
    }
  };

  const simplePrompt = async (promptMessage: string): Promise<boolean> => {
    const rnBiometrics = new ReactNativeBiometrics();
    try {
      const result = await rnBiometrics.simplePrompt({ promptMessage });
      return result.success;
    } catch (error) {
      console.error('Error during biometric prompt:', error);
      return false;
    }
  };

  return {
    isAvailable,
    biometryType,
    checkBiometricsAvailability,
    createKeys,
    createSignature,
    deleteKeys,
    biometricKeysExist,
    simplePrompt,
  };
}
