export default function EmailNotifications() {
    return (
        <section className="bg-slate-300 dark:bg-gray-900 rounded-lg p-4">
            <div className="lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Email notifications</h2>
                <span className="text-gray-500 dark:text-gray-400">You can set up Themesberg to get notifications</span>
            </div>
            <ul>
                <li>
                    <div>
                        <h3 className="text-md font-bold text-gray-900 dark:text-white">
                            Email notifications
                        </h3>
                        <div className="flex">
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Receive emails for new features, updates and security alerts
                            </p>
                            <label className="inline-flex items-center mb-5 cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <h3 className="text-md font-bold text-gray-900 dark:text-white">
                            Push notifications
                        </h3>
                        <div className="flex">
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Receive push notifications for new features, updates and security
                                alerts
                            </p>
                            <label className="inline-flex items-center mb-5 cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <h3 className="text-md font-bold text-gray-900 dark:text-white">
                            SMS notifications
                        </h3>
                        <div className="flex">
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Receive SMS for new features, updates and security alerts
                            </p>
                            <label className="inline-flex items-center mb-5 cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </li>
            </ul>
        </section>

    )
}
