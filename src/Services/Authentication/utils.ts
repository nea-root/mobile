// Define the Cognito Error structure
interface CognitoError extends Error {
    code: string; // Cognito error codes are returned as a "code" property
    message: string;
}

// Cognito Error Handler
export const cognitoErrorHandler = (error: CognitoError | any): string => {
    if (!error || !error.code) {
        return "An unknown error occurred. Please try again.";
    }

    // Map of Cognito error codes to user-friendly messages
    const errorMessages: Record<string, string> = {
        // Authentication errors
        NotAuthorizedException: "Incorrect username or password.",
        UserNotFoundException: "User does not exist. Please check your username or sign up.",
        UserNotConfirmedException: "Your account is not confirmed. Check your email for the confirmation link.",
        PasswordResetRequiredException: "Password reset is required. Please reset your password before signing in.",

        // Sign-up and confirmation errors
        InvalidPasswordException: "Your password does not meet the complexity requirements. Try a stronger password.",
        UsernameExistsException: "This username is already taken. Please choose a different one.",
        CodeMismatchException: "Invalid verification code. Please check your email or phone and try again.",
        ExpiredCodeException: "The verification code has expired. Please request a new one.",

        // Account recovery and MFA errors
        LimitExceededException: "Too many attempts. Please try again later.",
        TooManyFailedAttemptsException: "Too many failed attempts. Please try again later.",
        MFAMethodNotFoundException: "No valid MFA method found. Please contact support.",
        SoftwareTokenMFANotFoundException: "Software token MFA not enabled. Please contact support.",

        // General validation errors
        InvalidParameterException: "Invalid input provided. Please check your details and try again.",
        InvalidLambdaResponseException: "An invalid response was received from the server. Please try again later.",
        InvalidSmsRoleAccessPolicyException: "The SMS role trust relationship is invalid. Please contact support.",
        InvalidSmsRoleTrustRelationshipException: "The trust relationship for the SMS role is invalid. Please contact support.",
        ResourceNotFoundException: "The requested resource was not found.",
        TooManyRequestsException: "Too many requests. Please try again later.",

        // Internal errors
        InternalErrorException: "An internal error occurred. Please try again later.",
        NetworkError: "A network error occurred. Please check your internet connection and try again.",

        // Generic Cognito errors
        NotAuthorized: "You are not authorized to perform this action.",
        Unauthorized: "You are not authorized to perform this action.",
        UserLambdaValidationException: "The input failed server validation. Please try again later.",
    };

    // Return the mapped error message or a generic fallback message
    return errorMessages[error.code] || "An unexpected error occurred. Please try again.";
};


export const generateComplexPassword = (length: number = 12): string => {
    const charset: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
    let password: string = '';

    for (let i = 0; i < length; i++) {
        const randomIndex: number = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
};

