// hooks/useModal.ts
import { useRef, useEffect, useCallback } from 'react';

interface UseModalProps {
    onClose: () => void;
    isOpen?: boolean;
    closeOnOutsideClick?: boolean;
    closeOnEscape?: boolean;
    preventScroll?: boolean;
}

export const useModal = ({
    onClose,
    isOpen = true,
    closeOnOutsideClick = true,
    closeOnEscape = true,
    preventScroll = true
}: UseModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleEscapeKey = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape' && closeOnEscape) {
            onClose();
        }
    }, [onClose, closeOnEscape]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (modalRef.current &&
            !modalRef.current.contains(event.target as Node) &&
            closeOnOutsideClick) {
            onClose();
        }
    }, [onClose, closeOnOutsideClick]);

    useEffect(() => {
        if (!isOpen) return;

        if (closeOnOutsideClick) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        if (closeOnEscape) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        if (preventScroll) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleClickOutside, handleEscapeKey, closeOnOutsideClick, closeOnEscape, preventScroll]);

    return { modalRef };
};