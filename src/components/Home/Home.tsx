import React from 'react'

const Home = () => {
    return (
        <div className='min-h-screen flex-col text-white flex md:flex-row py-10 justify-center items-center gap-7'>

            <div>
                <a href="/search">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-cardD">
                        <img className="w-full" src="https://juancasac.wordpress.com/wp-content/uploads/2016/10/bst.gif" alt="Sunset in the mountains" />
                        <div className="px-6 py-4 text-center">
                            <div className="font-bold text-xl mb-2">Searching</div>

                        </div>
                    </div>
                </a>
            </div>
            <div>
                <a href="/sort">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-cardD">
                        <img className="w-full" src="https://visualgo.net/img/gif/sorting.gif" alt="Sunset in the mountains" />
                        <div className="px-6 py-4 text-center">
                            <div className="font-bold text-xl mb-2">Sorting</div>
                        </div>
                    </div>
                </a>
            </div>
            <div>
                <a href="/BT">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-cardD">
                        <img className="w-full" src="https://visualgo.net/img/gif/heap.gif" alt="Sunset in the mountains" />
                        <div className="px-6 py-4 text-center">
                            <div className="font-bold text-xl mb-2">Binary Tree</div>
                        </div>
                    </div>
                </a>
            </div>
            <div>
                <a href="/SP">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-cardD">
                        <img className="w-full" src="https://visualgo.net/img/gif/sssp.gif" alt="Sunset in the mountains" />
                        <div className="px-6 py-4 text-center">
                            <div className="font-bold text-xl mb-2">Shortest Path</div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Home