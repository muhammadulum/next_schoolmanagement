'use client'

import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

// Define proper types
type TableType = "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement";
type ActionType = "create" | "update" | "delete";

interface FormModalProps {
    table: TableType;
    type: ActionType;
    data?: any;
    id?: number;
    onSubmit?: (data: any) => void;
}

const FormModal = ({ table, type, data, id, onSubmit }: FormModalProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

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

    // Handle form submission
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
                <div className="space-y-4">
                    {/* This would be replaced with actual form fields based on the table type */}
                    <div className="text-sm text-gray-600">
                        Form fields for {type}ing {table} would go here.
                        {data && <pre className="mt-2 p-2 bg-gray-100 rounded text-xs">{JSON.stringify(data, null, 2)}</pre>}
                    </div>
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
                onClick={() => setOpen(true)}
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

export default FormModal;