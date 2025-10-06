import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        // You can log the error to an external service here
        // console.error('ErrorBoundary caught', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
                    <h2 className="text-2xl font-bold">
                        Something went wrong.
                    </h2>
                    <pre className="mt-4 text-sm text-red-600">
                        {String(this.state.error)}
                    </pre>
                    <button
                        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded"
                        onClick={() =>
                            this.setState({ hasError: false, error: null })
                        }
                    >
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
