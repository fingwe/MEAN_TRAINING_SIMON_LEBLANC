
export class Sort {

    isSelectedLength: boolean
    ascendingLength: boolean
    isSelectedStatus: boolean
    ascendingStatus: boolean
    isSelectedDate: boolean
    ascendingDate: boolean
    isSelectedStart: boolean
    ascendingStart: boolean
    isSelectedFinish: boolean
    ascendingFinish: boolean
    isSelectedDescription: boolean
    ascendingDescription: boolean
    

    init() {
        this.isSelectedLength= false;
        this.ascendingLength= false;
        this.isSelectedStatus= false;
        this.ascendingStatus= false;
        this.isSelectedDate= false;
        this.ascendingDate= false;
        this.isSelectedStart= false;
        this.ascendingStart= false;
        this.isSelectedFinish= false;
        this.ascendingFinish= false;
        this.isSelectedDescription= false;
        this.ascendingDescription= false;
    }

    constructor() {
        this.init();
    }

}