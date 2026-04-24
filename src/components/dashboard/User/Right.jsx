import React, { useState } from 'react'
import ViewModal from './ViewModal';
import CheckHomeworkModal from '../Teacher/CheckHomeworkModal';

const Right = ({ sub, homework }) => {

    const [viewModal, setViewModal] = useState(null)
    const [checkModal, setCheckModal] = useState(null);

    return (
        <div className="flex items-center  gap-3">
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
                    onClick={() => sub?.marks === 0 ? setCheckModal(homework?._id) : setViewModal(sub)}
                    className="text-xs px-3 py-1.5 bg-green-600 rounded-lg hover:bg-green-700 cursor-pointer
                    min-w-16
                    ">
                    {sub?.marks == 0 ? "check" : "checked"}
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
            {
                checkModal && <CheckHomeworkModal
                    submission={sub}
                    onClose={() => setCheckModal(null)}
                />
            }
        </div>
    )
}

export default Right