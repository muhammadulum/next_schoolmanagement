'use client'

import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

// Define proper types
type TableType = "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement";
type ActionType = "create" | "update" | "delete";

interface FormDataType {
    [key: string]: string;
}
interface FormModalProps {
    table: TableType;
    type: ActionType;
    data?: FormDataType;
    id?: number;
    onSubmit?: (data: any) => void;
}

const FormModal = ({ table, type, data, id, onSubmit }: FormModalProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(data || {});
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Reset form data when modal opens
    const handleModalOpen = () => {
        if (type === 'create') {
            setFormData({});
        } else if (type === 'update' && data) {
            setFormData(data);
        }
        setErrors({});
        setOpen(true);
    };

    // Validate form
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const fields = getFormFields();

        fields.forEach(field => {
            if (field.required && (!formData[field.name] || formData[field.name].toString().trim() === '')) {
                newErrors[field.name] = `${field.label} is required`;
            }

            // Email validation
            if (field.type === 'email' && formData[field.name]) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData[field.name])) {
                    newErrors[field.name] = 'Please enter a valid email address';
                }
            }

            // Number validation
            if (field.type === 'number' && formData[field.name]) {
                if (isNaN(Number(formData[field.name])) || Number(formData[field.name]) < 0) {
                    newErrors[field.name] = 'Please enter a valid positive number';
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Dynamic styling based on action type
    const getButtonStyles = () => {
        const baseClasses = "flex items-center justify-center rounded-full transition-colors duration-200 hover:opacity-80";

        switch (type) {
            case "create":
                return `w-8 h-8 bg-yellow-500 hover:bg-yellow-600 ${baseClasses}`;
            case "update":
                return `w-7 h-7 bg-sky-500 hover:bg-sky-600 ${baseClasses}`;
            case "delete":
                return `w-7 h-7 bg-purple-500 hover:bg-purple-600 ${baseClasses}`;
            default:
                return `w-7 h-7 bg-gray-500 hover:bg-gray-600 ${baseClasses}`;
        }
    };

    // Dynamic icon based on action type
    const getIcon = () => {
        const iconProps = { className: "text-white text-sm font-bold" };

        switch (type) {
            case "create":
                return <span {...iconProps}>+</span>;
            case "update":
                return <span {...iconProps}>✎</span>;
            case "delete":
                return <span {...iconProps}>×</span>;
            default:
                return null;
        }
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Get form fields based on table type
    const getFormFields = () => {
        const fieldConfig: Record<TableType, Array<{
            name: string;
            label: string;
            type: 'text' | 'email' | 'number' | 'date' | 'select' | 'textarea';
            required?: boolean;
            options?: string[];
        }>> = {
            teacher: [
                { name: 'firstName', label: 'First Name', type: 'text', required: true },
                { name: 'lastName', label: 'Last Name', type: 'text', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                { name: 'phone', label: 'Phone', type: 'text' },
                { name: 'subject', label: 'Subject', type: 'select', options: ['Math', 'Science', 'English', 'History'], required: true },
                { name: 'address', label: 'Address', type: 'textarea' }
            ],
            student: [
                { name: 'firstName', label: 'First Name', type: 'text', required: true },
                { name: 'lastName', label: 'Last Name', type: 'text', required: true },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'phone', label: 'Phone', type: 'text' },
                { name: 'grade', label: 'Grade', type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], required: true },
                { name: 'class', label: 'Class', type: 'select', options: ['A', 'B', 'C', 'D'], required: true },
                { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
                { name: 'address', label: 'Address', type: 'textarea' }
            ],
            parent: [
                { name: 'firstName', label: 'First Name', type: 'text', required: true },
                { name: 'lastName', label: 'Last Name', type: 'text', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                { name: 'phone', label: 'Phone', type: 'text', required: true },
                { name: 'relationship', label: 'Relationship', type: 'select', options: ['Father', 'Mother', 'Guardian'], required: true },
                { name: 'address', label: 'Address', type: 'textarea' }
            ],
            subject: [
                { name: 'name', label: 'Subject Name', type: 'text', required: true },
                { name: 'code', label: 'Subject Code', type: 'text', required: true },
                { name: 'description', label: 'Description', type: 'textarea' }
            ],
            class: [
                { name: 'name', label: 'Class Name', type: 'text', required: true },
                { name: 'grade', label: 'Grade', type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], required: true },
                { name: 'capacity', label: 'Capacity', type: 'number', required: true },
                { name: 'supervisor', label: 'Class Supervisor', type: 'text' }
            ],
            lesson: [
                { name: 'title', label: 'Lesson Title', type: 'text', required: true },
                { name: 'subject', label: 'Subject', type: 'select', options: ['Math', 'Science', 'English', 'History'], required: true },
                { name: 'teacher', label: 'Teacher', type: 'text', required: true },
                { name: 'class', label: 'Class', type: 'text', required: true },
                { name: 'date', label: 'Date', type: 'date', required: true },
                { name: 'startTime', label: 'Start Time', type: 'text', required: true },
                { name: 'endTime', label: 'End Time', type: 'text', required: true }
            ],
            exam: [
                { name: 'title', label: 'Exam Title', type: 'text', required: true },
                { name: 'subject', label: 'Subject', type: 'select', options: ['Math', 'Science', 'English', 'History'], required: true },
                { name: 'class', label: 'Class', type: 'text', required: true },
                { name: 'date', label: 'Exam Date', type: 'date', required: true },
                { name: 'startTime', label: 'Start Time', type: 'text', required: true },
                { name: 'duration', label: 'Duration (minutes)', type: 'number', required: true },
                { name: 'totalMarks', label: 'Total Marks', type: 'number', required: true }
            ],
            assignment: [
                { name: 'title', label: 'Assignment Title', type: 'text', required: true },
                { name: 'subject', label: 'Subject', type: 'select', options: ['Math', 'Science', 'English', 'History'], required: true },
                { name: 'class', label: 'Class', type: 'text', required: true },
                { name: 'dueDate', label: 'Due Date', type: 'date', required: true },
                { name: 'description', label: 'Description', type: 'textarea', required: true },
                { name: 'totalMarks', label: 'Total Marks', type: 'number', required: true }
            ],
            result: [
                { name: 'studentId', label: 'Student ID', type: 'text', required: true },
                { name: 'examId', label: 'Exam ID', type: 'text', required: true },
                { name: 'marksObtained', label: 'Marks Obtained', type: 'number', required: true },
                { name: 'grade', label: 'Grade', type: 'select', options: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'], required: true }
            ],
            attendance: [
                { name: 'studentId', label: 'Student ID', type: 'text', required: true },
                { name: 'date', label: 'Date', type: 'date', required: true },
                { name: 'status', label: 'Status', type: 'select', options: ['Present', 'Absent', 'Late'], required: true },
                { name: 'remarks', label: 'Remarks', type: 'textarea' }
            ],
            event: [
                { name: 'title', label: 'Event Title', type: 'text', required: true },
                { name: 'description', label: 'Description', type: 'textarea', required: true },
                { name: 'date', label: 'Event Date', type: 'date', required: true },
                { name: 'startTime', label: 'Start Time', type: 'text', required: true },
                { name: 'endTime', label: 'End Time', type: 'text' },
                { name: 'location', label: 'Location', type: 'text' }
            ],
            announcement: [
                { name: 'title', label: 'Announcement Title', type: 'text', required: true },
                { name: 'content', label: 'Content', type: 'textarea', required: true },
                { name: 'targetAudience', label: 'Target Audience', type: 'select', options: ['All', 'Teachers', 'Students', 'Parents'], required: true },
                { name: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High'], required: true },
                { name: 'publishDate', label: 'Publish Date', type: 'date', required: true }
            ]
        };

        return fieldConfig[table] || [];
    };

    // Render form field based on type
    const renderField = (field: any) => {
        const baseInputClasses = `mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border ${errors[field.name] ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`;
        const value = formData[field.name] || '';

        const fieldElement = (() => {
            switch (field.type) {
                case 'select':
                    return (
                        <select
                            name={field.name}
                            value={value}
                            onChange={handleInputChange}
                            required={field.required}
                            className={baseInputClasses}
                        >
                            <option value="">Select {field.label}</option>
                            {field.options?.map((option: string) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    );

                case 'textarea':
                    return (
                        <textarea
                            name={field.name}
                            value={value}
                            onChange={handleInputChange}
                            required={field.required}
                            rows={3}
                            className={baseInputClasses}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                    );

                default:
                    return (
                        <input
                            type={field.type}
                            name={field.name}
                            value={value}
                            onChange={handleInputChange}
                            required={field.required}
                            className={baseInputClasses}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                    );
            }
        })();

        return (
            <div>
                {fieldElement}
                {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                )}
            </div>
        );
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (onSubmit) {
                onSubmit({ table, type, id, data });
            }

            setOpen(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    // Dynamic modal title
    const getModalTitle = () => {
        const action = type.charAt(0).toUpperCase() + type.slice(1);
        const entity = table.charAt(0).toUpperCase() + table.slice(1);
        return `${action} ${entity}`;
    };

    // Dynamic modal content
    const getModalContent = () => {
        if (type === "delete") {
            return (
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <span className="text-2xl">⚠️</span>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Delete {table}
                        </DialogTitle>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Are you sure you want to delete this {table}? All data will be permanently removed.
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        // For create/update forms
        return (
            <div>
                <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                    {getModalTitle()}
                </DialogTitle>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {getFormFields().map((field) => (
                        <div key={field.name}>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            {renderField(field)}
                        </div>
                    ))}
                    {getFormFields().length === 0 && (
                        <div className="text-sm text-gray-600">
                            No form fields configured for {table} yet.
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Dynamic action buttons
    const getActionButtons = () => {
        if (type === "delete") {
            return (
                <>
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </>
            );
        }

        return (
            <>
                <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? "Saving..." : type === "create" ? "Create" : "Update"}
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    disabled={loading}
                >
                    Cancel
                </button>
            </>
        );
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                className={getButtonStyles()}
                onClick={handleModalOpen}
                aria-label={`${type} ${table}`}
            >
                {getIcon()}
            </button>

            {/* Modal Dialog */}
            <Dialog open={open} onClose={setOpen} className="relative z-50">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    {getModalContent()}
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    {getActionButtons()}
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

// Example usage component
export const ExampleUsage = () => {
    const handleFormSubmit = (formResult: any) => {
        console.log('Form submitted:', formResult);
        // Here you would typically make an API call to save the data
        // Example: await api.saveData(formResult);
    };

    const sampleTeacher = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@school.com',
        phone: '+1234567890',
        subject: 'Math',
        address: '123 Teacher St, Education City'
    };

    return (
        <div className="p-8 space-y-4">
            <h2 className="text-xl font-bold">FormModal Examples</h2>

            <div className="flex gap-4 items-center">
                <span>Teacher Actions:</span>
                <FormModal
                    table="teacher"
                    type="create"
                    onSubmit={handleFormSubmit}
                />
                <FormModal
                    table="teacher"
                    type="update"
                    data={sampleTeacher}
                    id={1}
                    onSubmit={handleFormSubmit}
                />
                <FormModal
                    table="teacher"
                    type="delete"
                    data={sampleTeacher}
                    id={1}
                    onSubmit={handleFormSubmit}
                />
            </div>

            <div className="flex gap-4 items-center">
                <span>Student Actions:</span>
                <FormModal
                    table="student"
                    type="create"
                    onSubmit={handleFormSubmit}
                />
            </div>

            <div className="flex gap-4 items-center">
                <span>Event Actions:</span>
                <FormModal
                    table="event"
                    type="create"
                    onSubmit={handleFormSubmit}
                />
            </div>
        </div>
    );
};

export default FormModal;