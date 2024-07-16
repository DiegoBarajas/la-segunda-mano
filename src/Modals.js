import Swal from "sweetalert2";
import ReactDOM from 'react-dom';
import React from 'react';

class Modals{
    #colors = {
        blue: "#2C3E50",
        mint: "#1ABC9C",
        red: "#FF5E58",
        gray: "#BDC3C7",
        backgound: "#ECF0F1"
    }

    alert(title, content, icon=null, confirmButtonText='Aceptar'){
        return Swal.fire({
            title,
            html: `<p>${content}</p>`,
            icon,
            iconColor: this.#getIconColor(icon),

            confirmButtonText,
            confirmButtonColor: this.#colors.mint,

            customClass: {
                popup: 'swal'
            }
        });

    }

    petitionAlert(title, content, icon=null){
        return  Swal.fire({
            title: title,
            html: content,
            icon: icon,
            timerProgressBar: true,
            showConfirmButton: false, // Oculta el botón de confirmación si lo deseas
            didOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la alerta
            allowEscapeKey: false, // Evita que se cierre con la tecla de escape
            allowEnterKey: false, // Evita que se cierre con la tecla Enter
        });
    }

    async confirm(title, content, icon=null, onConfirm=()=>{}, onDeny=()=>{},confirmText="Aceptar", denyText="Denegar", showCancelButton=false, cancelText="Cancelar"){
        await Swal.fire({
            title,
            html: content,
            icon: icon,

            showDenyButton: true,
            showCancelButton: showCancelButton,
            confirmButtonText: confirmText,
            confirmButtonColor: this.#colors.mint,

            denyButtonText: denyText,
            denyButtonColor: this.#colors.red,

            cancelButtonText: cancelText,
            cancelButtonColor: this.#colors.gray,

          }).then((result) => {
            if (result.isConfirmed) {
                onConfirm()
            } else if (result.isDenied) {
                onDeny()
            }
          });          
    }

    async toast(text, icon='success', time=1.5){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
              popup: 'colored-toast',
            },
            showConfirmButton: false,
            timer: time*1000,
            timerProgressBar: true,
        });

        Toast.fire({
            icon: icon,
            title: text
        })
    }

    popup(ReactComponent, className) {
        Swal.fire({
            html: '<div id="react-swal"></div>',
            customClass: className,
            confirmButtonText: "Cerrar",
            showCloseButton: true,
            confirmButtonColor: this.#colors.red,
            
            didOpen: () => {
                ReactDOM.render(<ReactComponent />, document.getElementById('react-swal'));
            },
            willClose: () => {
                ReactDOM.unmountComponentAtNode(document.getElementById('react-swal'));
            }
        });
    }

    #getIconColor(icon){
        switch(icon){
            case 'warning': return "#ffd900";
            case 'error': return this.#colors.red;
            case 'success': return "#27bc13";
            case 'question': return this.#colors.gray;
            case 'info': return this.#colors.mint;

            default: return null;
        }
    }
}

const modals = new Modals();
export default modals; 