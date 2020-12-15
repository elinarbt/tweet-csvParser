var FDirName = function(month,dayNum){
    if(dayNum <= 31 && dayNum >=1){
        this.dayNum = dayNum;
    }else{
        this.dayNum = -1;
    }

    if(month.includes('Jan')){
        this.month = 1;
    }else if(month.includes('Feb')){
        this.month = 2;
    }else if(month.includes('Mar')){
        this.month = 3;
    }else if(month.includes('Apr')){
        this.month = 4;
    }else if(month.includes('May')){
        this.month = 5;
    }else if(month.includes('Jun')){
        this.month = 6;
    }else if(month.includes('Jul')){
        this.month = 7;
    }else if(month.includes('Aug')){
        this.month = 8;
    }else if(month.includes('Sep')){
        this.month = 9;
    }else if(month.includes('Oct')){
        this.month = 10;
    }else if(month.includes('Nov')){
        this.month = 11;
    }else if(month.includes('Dec')){
        this.month = 12;
    }

}

module.exports = FDirName;