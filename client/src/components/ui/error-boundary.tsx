import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-white">
                    <div className="max-w-md w-full p-6 bg-zinc-900 rounded-xl border border-red-900 shadow-lg">
                        <div className="flex items-center gap-3 text-red-500 mb-4">
                            <AlertCircle className="w-8 h-8" />
                            <h2 className="text-xl font-bold">Something went wrong</h2>
                        </div>
                        <p className="text-gray-400 mb-4">
                            The application encountered an error. Please show this screen to support.
                        </p>
                        <div className="bg-black p-4 rounded-lg overflow-auto max-h-64 text-xs font-mono mb-4 text-red-300 whitespace-pre-wrap break-words">
                            {this.state.error?.toString()}
                        </div>
                        <button
                            onClick={() => window.location.replace("/")}
                            className="w-full py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200"
                        >
                            Return to Home
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
