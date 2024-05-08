export default function Notifications() {
    return (
        <section className="bg-white dark:bg-gray-900 rounded-lg">
            <div className="max-w-2xl p-4 mx-auto lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Alerts & Notifications</h2>
                <span className="text-gray-500 dark:text-gray-400">You can set up Themesberg to get notifications</span>
            </div>

            <ul>
                <li>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Email notifications</h3>
                        <p className="text-gray-500 dark:text-gray-400">Receive emails for new features, updates and security alerts</p>
                    </div>
                </li>
                <li>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Push notifications</h3>
                        <p className="text-gray-500 dark:text-gray-400">Receive push notifications for new features, updates and security alerts</p>
                    </div>
                </li>
                <li>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">SMS notifications</h3>
                        <p className="text-gray-500 dark:text-gray-400">Receive SMS for new features, updates and security alerts</p>
                    </div>
                </li>
            </ul>

        </section>

    )
}