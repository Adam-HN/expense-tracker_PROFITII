import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pickerRef = useRef(null);

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
            <div
                className='flex items-center gap-4 cursor-pointer'
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg'>
                    {icon ? (
                        <img src={icon} alt="Icon" className='w-12 h-12' />
                    ) : (
                        <LuImage className='w-6 h-6' />
                    )}
                </div>

                <p className='text-sm'>{icon ? "Change Icon" : "Pick Icon"}</p>
            </div>

            {isOpen && (
                <div className='relative' ref={pickerRef}>
                    <button
                        className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer'
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX className='w-6 h-6' />
                    </button>

                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={(emoji) => {
                            onSelect(emoji?.imageUrl || "")
                            setIsOpen(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;
