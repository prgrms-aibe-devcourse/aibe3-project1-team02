import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-bold text-blue-400 font-pacifico">
                            T.A.T
                        </Link>
                        <p className="mt-4 text-gray-400 max-w-md">
                            AI 기반 여행 계획 플랫폼으로 더 스마트하고 편리한 여행을 만들어갑니다.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a
                                href="https://github.com/prgrms-aibe-devcourse/aibe3-project1-team02"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
                                aria-label="Github"
                            >
                                <i className="ri-github-fill text-lg"></i>
                            </a>

                            <a
                                href="https://www.notion.so/Team2_-2233550b7b5580979c7ec140fa2a6a3e"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
                                aria-label="Notion"
                            >
                                <i className="ri-notion-fill text-lg"></i>
                            </a>
                        </div>
                    </div>

                    <div className="md:ml-auto pr-4">
                        <h3 className="font-semibold mb-4">서비스</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/destinations"
                                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    여행지 찾기
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/planner"
                                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    여행 계획
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/community"
                                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    여행후기
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 TripAndTravel. 모든 권리가 보호됩니다.</p>
                </div>
            </div>
        </footer>
    )
}
