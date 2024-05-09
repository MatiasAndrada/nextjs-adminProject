export default async function Sessions() {
    return (
        <section className="h-full bg-slate-300 dark:bg-gray-900 rounded-lg p-4">
            <div className="lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Sessions</h2>
                <span className="text-gray-900 dark:text-gray-400">You can set up Themesberg to get notifications</span>
            </div>
            <div className="grid grid-cols-2">
                <div className=" flex items-center justify-center w-32 h-32 bg-green-200 rounded-lg">
                    <p>Active</p>
                </div>
                <div className="flex items-center justify-center w-32 h-32 bg-red-200 rounded-lg">
                    <p>Inactive</p>
                </div>
            </div>
        </section>

    )
}