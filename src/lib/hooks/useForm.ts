/**
 * useForm Hook
 * Generic form handling with validation and submission
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import type { ValidationErrors, FormConfig } from '@/lib/types/forms';

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => ValidationErrors;
  onSubmit: (values: T) => Promise<{ success: boolean; message: string }>;
  config?: FormConfig;
}

interface UseFormReturn<T> {
  // State
  values: T;
  errors: ValidationErrors;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError: string | null;
  submitSuccess: string | null;
  
  // Actions
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFieldValue: (name: keyof T, value: T[keyof T]) => void;
  setFieldError: (name: keyof T, error: string | null) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
  
  // Helpers
  isValid: boolean;
  getFieldProps: (name: keyof T) => {
    name: string;
    value: T[keyof T];
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  };
  getFieldError: (name: keyof T) => string | undefined;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
  config = {},
}: UseFormOptions<T>): UseFormReturn<T> {
  const {
    validateOnChange = false,
    validateOnBlur = true,
    showSuccessMessage = true,
    successMessageDuration = 5000,
  } = config;

  // State
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Clear success message after duration
  useEffect(() => {
    if (submitSuccess && showSuccessMessage) {
      const timer = setTimeout(() => {
        setSubmitSuccess(null);
      }, successMessageDuration);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, showSuccessMessage, successMessageDuration]);

  // Run validation
  const runValidation = useCallback((valuesToValidate: T): ValidationErrors => {
    if (!validate) return {};
    return validate(valuesToValidate);
  }, [validate]);

  // Handle input change
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;

    setValues((prev) => {
      const newValues = { ...prev, [name]: newValue };
      
      if (validateOnChange) {
        const newErrors = runValidation(newValues);
        setErrors(newErrors);
      }
      
      return newValues;
    });

    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError(null);
    }
  }, [validateOnChange, runValidation, submitError]);

  // Handle input blur
  const handleBlur = useCallback((
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    if (validateOnBlur) {
      const newErrors = runValidation(values);
      setErrors(newErrors);
    }
  }, [validateOnBlur, runValidation, values]);

  // Set field value programmatically
  const setFieldValue = useCallback((name: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Set field error programmatically
  const setFieldError = useCallback((name: keyof T, error: string | null) => {
    setErrors((prev) => {
      if (error === null) {
        const { [name as string]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name as string]: error };
    });
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Record<keyof T, boolean>);
    setTouched(allTouched);

    // Run validation
    const validationErrors = runValidation(values);
    setErrors(validationErrors);

    // Check for errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await onSubmit(values);
      
      if (result.success) {
        setIsSubmitted(true);
        if (showSuccessMessage) {
          setSubmitSuccess(result.message);
        }
      } else {
        setSubmitError(result.message);
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [values, runValidation, onSubmit, showSuccessMessage]);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({} as Record<keyof T, boolean>);
    setIsSubmitting(false);
    setIsSubmitted(false);
    setSubmitError(null);
    setSubmitSuccess(null);
  }, [initialValues]);

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0;

  // Get props for a field
  const getFieldProps = useCallback((name: keyof T) => ({
    name: name as string,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
  }), [values, handleChange, handleBlur]);

  // Get error for a field (only if touched)
  const getFieldError = useCallback((name: keyof T): string | undefined => {
    return touched[name] ? errors[name as string] : undefined;
  }, [touched, errors]);

  return {
    // State
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    submitError,
    submitSuccess,
    
    // Actions
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    handleSubmit,
    reset,
    
    // Helpers
    isValid,
    getFieldProps,
    getFieldError,
  };
}

export default useForm;

