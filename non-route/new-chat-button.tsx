import { Form, useNavigation } from "react-router";

export function NewChatButton({
    fullPage = false,
}: { fullPage?: boolean }) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    if (fullPage && isSubmitting) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-lg text-amber-700 animate-pulse">
                    Creating your chat…
                </div>
            </div>
        );
    }

    return (
        <Form method="post" action="/chat/new">
            <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-md shadow text-white ${isSubmitting
                    ? "bg-amber-400 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700"
                    }`}
            >
                {isSubmitting ? "Creating chat…" : "+ New Chat"}
            </button>
        </Form>
    );
}
