import React, { useState } from 'react'
import ViewModal from './ViewModal';

const Right = ({ sub, homework }) => {

    const [viewModal, setViewModal] = useState(null)
    const [check, setCheck] = useState(null);


    return (
        <div className="flex items-center  gap-3 flex-col sm:flex-row">
            <span className="text-xs text-gray-400">
                {new Date(sub?.submittedAt
                ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                })}
            </span>

            <div className='flex gap-4'>
                <button
                    onClick={() => setViewModal(sub)}
                    className="text-xs px-3 py-1.5 bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer">
                    View
                </button>

                <button

                    className="text-xs px-3 py-1.5 bg-green-600 rounded-lg hover:bg-green-700 cursor-pointer">
                    Check
                </button>
            </div>



            {/* view modal */}
            {
                viewModal && <ViewModal
                    viewModal={viewModal}
                    onClose={() => setViewModal(null)}
                />

            }
            {/* check modal */}
        </div>
    )
}

export default Right