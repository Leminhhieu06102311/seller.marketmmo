import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { hideModal } from "@/redux/modalSlice"

export default function ContentModal({ children, nameModal }: { children: React.ReactNode, nameModal: string }) {
    const dispatch = useAppDispatch()
    const { name } = useAppSelector((state) => state.modal)
    return (
        <div>
            {name.includes(nameModal) && (
                <div className="fixed top-0 bottom-0 right-0 left-0 bg-overlay z-[100]">
                    <div className="absolute top-0 right-0 bottom-0 left-0" onClick={() => dispatch(hideModal(nameModal))}>

                    </div>
                    <div className="w-full h-full">

                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}