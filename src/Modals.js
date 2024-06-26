import Swal from "sweetalert2";

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