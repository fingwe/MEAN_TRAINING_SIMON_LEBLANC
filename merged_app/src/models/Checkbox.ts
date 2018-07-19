export class CheckBox {

    five: Boolean;

    ten: Boolean;

    fifteen: Boolean;

    setFive() {
        this.five = true;
        this.ten = false;
        this.fifteen = false;
    }

    setTen() {
        this.five = false;
        this.ten = true;
        this.fifteen = false;
    }

    setFifteen() {
        this.five = false;
        this.ten = false;
        this.fifteen = true;
    }

    returnSelected(): string {
        if ( this.five ) {
            return 'five';
        }
        if ( this.ten ) {
            return 'ten';
        }
        if ( this.fifteen ) {
            return 'fifteen';
        }
    }

    constructor() {
        this.setFive();
    }
    
}