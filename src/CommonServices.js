
 export default class CommonServices {


    static validateFields(input){
        if (this.input_cidade_name.value === "") {
            this.callAlertModal("blank", "CHANGE_MODAL_CONTENT", 2000);
            this.input_cidade_name.focus();
        }
    }

    
}