(function(global){
    function initModal(modalId, closeButtonId){
        const modal=document.getElementById(modalId),
              closeButton=document.getElementById(closeButtonId);
        if(modal && closeButton){
            closeButton.addEventListener('click',()=>closeModal(modalId));
            modal.addEventListener('click',e=>e.target===modal && closeModal(modalId));
            document.addEventListener('keydown', (e) => (e.key === 'Escape' || e.key === ' ' || e.key === 'Spacebar') && closeModal(modalId));
        }
    }

    function showModal(modalId, autoCloseTime){
        const modal=document.getElementById(modalId);
        if(modal){
            modal.classList.add('show');
            if(autoCloseTime && typeof autoCloseTime==='number'){
                setTimeout(()=>closeModal(modalId), autoCloseTime);
            }
        }
    }

    function closeModal(modalId){
        const modal=document.getElementById(modalId);
        if(modal) modal.classList.remove('show');
    }

    global.ModalLib={initModal, showModal, closeModal};

    document.addEventListener('DOMContentLoaded',()=>{
        ModalLib.initModal('aboutModal','closeBtn');
        ModalLib.showModal('aboutModal');
    });

})(window);
