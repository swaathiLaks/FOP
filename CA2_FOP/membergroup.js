// Name : Swaathi Lakshmanan
// Class: DISM/1A/05
// Adm : 2227171
// 2nd draft


//change
//module imports
var Member = require('./member.js');
var input = require('readline-sync');

//info is to cycle through for opt1 & opt2
var info = ['\nName: ', 'Membership Type: ', 'Date joined: ', 'Date of Birth: ', 'Points Earned: '];


//member group class
class MemberGroup{
    constructor(){
        this.arr = [];
        this.arr.push(new Member('Leonardo', 'Gold', '1 Dec 2019', '1 Jan 1980', 1400));
        this.arr.push(new Member('Catherine', 'Ruby', '14 Jan 2020', '28 Oct 1985', 250));
        this.arr.push(new Member('Luther', 'Gold', '29 Apr 2020', '16 Mar 1992', 3350));
        this.arr.push(new Member('Bruce','Diamond','3 Jun 2020', '18 Mar 1994', 40200));
        this.arr.push(new Member('Amy','Ruby', '5 Jun 2020', '31 May 2000', 500));

    }

    //will change the name of the person such that first letter is cap and the rest are small
    rename(string) {
        string = string.toLowerCase();
        string = string.charAt(0).toUpperCase() + string.slice(1);
        return string;
    }

    //opt 1
    //short for display info. This can display the info for one member.
    //Object.values = returns an array of a given object's own enumerable property values.
    disInfo(num){
        var str = "";
        for(var rep=0; rep<info.length; rep++){
            str += ("\n"+info[rep] + Object.values(this.arr[num])[rep]);
        }
        return str;
    }
    //opt 2
    //finding, gets the person's name and returns the index in the array where the person's namee can be found
    finding(per){
        var value = "false"
        for(var rep = 0; rep<this.arr.length; rep++){
            if (this.arr[rep].name==per){
                value = rep;
                rep = this.arr.length;
            }
        }
        return value;
        
    }

    //short for search member. Uses index from finding to return the person in question's info
    searchMem(per){
        var value = this.finding(per);
        if(value == "false"){
            return("\nMember does not exist.")
        }else{
            return this.disInfo(value)
        }
    
    }

    //opt 4
    //convert Money to points
    convert(mon) {
        var points;
        if (mon > 2500) {
            points = 2000
        } else if (mon > 1000 && mon < 2501) {
            points = 1000
        } else if (mon > 500 && mon < 1001) {
            points = 500
        } else if (mon > 200 && mon < 501) {
            points = 200
        } else if (mon > 100 && mon < 201) {
            points = 100
        } else if (mon > 50 && mon < 101) {
            points = 50
        } else if (mon < 51 && mon > 0) {
            points = 10
        } else {
            points = false
        }
        return points
    }


    //used to change the type of membership of person with updated points
    changeType(value){
        if (this.arr[value].points>=20000){
            this.arr[value].type= "Diamond";
        }else if(this.arr[value].points>=5000){
            this.arr[value].type= "Platinum";
        }else if(this.arr[value].points>=500){
            this.arr[value].type= "Gold";
        }else{
            this.arr[value].type= "Ruby";
        }
    }
    
    //opt3
    //add new member to data base
    opt3(per,BirthDate){
       var newmem = new Member;
       newmem.name=per;
       newmem.birth=BirthDate;
       this.arr.push(newmem);
    }

    //opt 5: opt 1
    //display member type
    disMemType(str){
        //check if valid membership type is entereed
        str = this.rename(str);
        if(str == "Diamond"||str == "Platinum"||str == "Gold"||str == "Ruby"){
            var answer = "Member(s) of membership type "+str+": ";
            var names = answer;
            //if membership type is valid, collates all members with that membership type
            for (var rep=0; rep<this.arr.length; rep++){
                if (this.arr[rep].type==str){
                    if(names==answer){
                        names +=  this.arr[rep].name;
                    }else{
                        names +=  ", "+ this.arr[rep].name;
                    }
                    
                }
            }
            //for instance no one is platinum, then this will be returned
            if (names == answer){
                return "\t\tThere are no members of "+str+" membership type";
            } else{
                return names
            }
        } else {
            return "\t\tPlease enter a valid membership type. \n"
        }
        
    }

    //opt5: opt 2
    //diplay youngest and oldest member
    //split birth date into strings for day month and year
    splitBirth(num){
        var str = this.arr[num].birth;
        var[day, month, year] = str.split(' ');
        month = this.rename(month);
        //rearrange it into a format valid for the date class
        return month+" "+day+", "+year;
    }

    //checking who is the youngest and oldest
    oldest(){
        var index=0;
        var str = this.arr[index].name;
        for(var i=1;i<this.arr.length; i++ ){
            //changing date to comparable numbers
            var parsedDate1=Date.parse(this.splitBirth(i))//the higher the parsed date number, the younger the person.
            var parsedDate2=Date.parse(this.splitBirth(index))
            if (parsedDate1<parsedDate2){//compare dates
                index = i;
                str = this.arr[index].name;
            }else if(parsedDate1==parsedDate2){
                str += ", "+ this.arr[i].name;
            }
        }
        return "Oldest member  : "+ str;
    }

    youngest(){
        var index=0;
        var str = this.arr[index].name;
        for(var i=1;i<this.arr.length; i++ ){
            var parsedDate1=Date.parse(this.splitBirth(i)) 
            var parsedDate2=Date.parse(this.splitBirth(index)) // change both dates
            if (parsedDate1>parsedDate2){ 
                index = i;
                str = this.arr[index].name;
            } else if(parsedDate1==parsedDate2){
                str += ", "+ this.arr[i].name;
            }
        }
        return "Youngest member: "+ str; 
    }

    //opt5: opt3
    //highest and lowest points
    highest(){
        var index = 0
        var str = ""
        //use loop to run through indexes, compares points earned and saves member with higher point's index (or lower for lowest) in index to be compared with rest of the mebers
        for(var i= 1; i<this.arr.length; i++){
            if (this.arr[i].points>this.arr[index].points){
                index = i
                str = this.arr[index].name
            }else if(this.arr[i].points==this.arr[index].points){
                str += ", "+ this.arr[i].name;
            }
        }
        return "Highest member: "+str;
    }

    lowest(){
        var index = 0
        var str = ""
        for(var i= 1; i<this.arr.length; i++){
            if (this.arr[i].points<this.arr[index].points){
                index = i
                str = this.arr[index].name
            }else if(this.arr[i].points==this.arr[index].points){
                str += ", "+ this.arr[i].name;
            }
        }
        return "Lowest member : "+str;
    }

    //opt5:opt4
    //total members of each membership type
    //this checks number of people in one membership type
    numPerType(str){
        var index = 0;
        for(var i=0; i<this.arr.length; i++){
            if(this.arr[i].type==str){
                index++
            }
        }

        return str+":  "+index
    }

    //opt5:opt5
    //total points in each membership type
    totalPointsPerType(str){
        var index = 0;
        for(var i=0; i<this.arr.length; i++){
            if(this.arr[i].type==str){
                index+= this.arr[i].points
            }
        }

        return str+":  "+index
    }
    //opt 5 do while loop
    opt5(num){
        if(num==1){
            do{
                var str = input.question("\t\tEnter Membership Type: ");
                var output = this.disMemType(str);
                if (output == "\t\tPlease enter a valid membership type. \n"){
                    console.log(output)
                }else{
                    return "\t\t"+output
                }
            }while(output == "\t\tPlease enter a valid membership type. \n");  
        }else if (num==2){
            return "\t\t"+this.youngest()+"\n\t\t"+this.oldest();
        }else if (num==3){
            return "\t\t"+this.highest()+"\n\t\t"+this.lowest()
        }else if (num==4){
            return "\t\t"+this.numPerType('Ruby')+"\n\t\t"+this.numPerType('Gold')+"\n\t\t"+this.numPerType('Platinum')+"\n\t\t"+this.numPerType('Diamond');
        }else if (num==5){
            return "\t\t"+this.totalPointsPerType('Ruby')+"\n\t\t"+this.totalPointsPerType('Gold')+"\n\t\t"+this.totalPointsPerType('Platinum')+"\n\t\t"+this.totalPointsPerType('Diamond');
        }else if (num==6){
            return ""
        }else{
            return "\t\tPlease enter a valid input."
        }
    }

    //opt 8: creative component
    //check whether member exists using this.finding
    opt8(str){
        var value = this.finding(str), points
        if (value =="false"){
            return "Member doesn't exist"
        }else{
            var type = this.rename(input.question("What membership type do they want to upgarde to: "))
            if(type == "Diamond"){
                points = 20000-this.arr[value].points //check how much more points is required
            } else if(type == "Platinum"){
                points = 5000-this.arr[value].points
            }else if(type == "Gold"){
                points = 500-this.arr[value].points
            }else if(type == "Ruby"){
                return"All members have this type."
            }else{
                return "\t\tMembership type doesn't exist.\n"
            }
            do{
                var num = input.question('How many recipts do they intend to use: ')//check how many receipts money should be split over
                if (!(num.match(/^([0-9]*[.])?[0-9]+$/))){
                    console.log('please enter a valid number')
                }
            }while(!(num.match(/^([0-9]*[.])?[0-9]+$/)))

            var pointsPerReceipt = points/num
            
            if (pointsPerReceipt>0&&pointsPerReceipt<11){//returns money required for points
                return "member must spend less than $50/receipt"
            }else if (pointsPerReceipt>10&&pointsPerReceipt<51){
                return "member must spend between $51 to $100/receipt"
            }else if (pointsPerReceipt>50&&pointsPerReceipt<101){
                return "member must spend between $101 to $200/receipt"
            }else if (pointsPerReceipt>100&&pointsPerReceipt<201){
                return "member must spend between $201 to $500/receipt"
            }else if (pointsPerReceipt>200&&pointsPerReceipt<501){
                return "member must spend between $501 to $1001/receipt"
            }else if (pointsPerReceipt>500&&pointsPerReceipt<1001){
                return "member must spend between $1001 to $2500/receipt"
            }else if (pointsPerReceipt>1000&&pointsPerReceipt<2001){
                return "member must spend $2500 and more/receipt"
            }else if(num<1){
                return "member already achieved the membership"
            }else{
                return "member needs more recepits than " + num
            }

            
        }

    }
    
}

//Module exports
module.exports = MemberGroup;