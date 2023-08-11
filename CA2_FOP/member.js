// Name : Swaathi Lakshmanan
// Class: DISM/1A/05
// Adm : 2227171
// 2nd draft

//using date class
var date = new Date();

//member class
class Member{
    constructor(name, type='Ruby', join = this.today(), birth ,points = 0){
        this.name = name;
        this.type = type;
        this.join = join; 
        this.birth = birth;
        this.points = points;
    }
    //today (join date) is for op 3. Use current date and change month from number to short form word
    today(){
        var str= (date.getMonth()+1)
        if(str == 1){
            str ="Jan";
        }else if(str == 2){
            str = "Feb";
        }else if(str == 3){
            str = "Mar";
        }else if(str == 4){
            str = "Apr";
        }else if(str == 5){
            str = "May";
        }else if(str == 6){
            str = "Jun";
        }else if(str == 7){
            str = "Jul";
        }else if(str == 8){
            str = "Aug";
        }else if(str == 9){
            str = "Sep";
        }else if(str == 10){
            str = "Oct";
        }else if(str == 11){
            str = "Nov";
        }else if(str == 12){
            str = "Dec";
        }
        var todayDate = date.getDate()+" "+str+" "+date.getFullYear();
        return todayDate;
         
    }


}

module.exports = Member;