// Name : Swaathi Lakshmanan
// Class: DISM/1A/05
// Adm : 2227171
// 2nd draft

//module imports
var input = require('readline-sync');
var Member = require("./member.js");
var MemberGroup = require("./membergroup.js");

//objects
memberList = new MemberGroup();

//prompts
//validates name by checking the length of str & checking using rgx
do{    
    var name = memberList.rename(input.question('Welcome to XYZ Membership Loyalty Programme! \nPlease enter your name: '));
    if(name.length==0|| !(name.match(/^[A-Za-z\s]+$/))){
        console.log('Please enter a valid name.\n')
    }
}while(name.length==0|| !(name.match(/^[A-Za-z\s]+$/)))

var prompt = "\nHi " + name + ", please select your choice: \n\t1. Display all members\' information  \n\t2. Display member information \n\t3. Add new member\n\t4. Update points earned \n\t5. Statistics \n\t6. Exit \n\t7. Remove a member\n\t8. Calculate points a member needs to earn for particular membership\n\t>> ";

var opt5Prompt = "\n\t\tPlease select an option from the sub-menu:\n\t\t1. Display names of (all) a certain type of members only.\n\t\t2. Display the name of the youngest and oldest member in the system.\n\t\t3. Display the name of members with the highest and lowest points earned.\n\t\t4. Display total number of members in each membership type.\n\t\t5. Display the total points in each membership type.\n\t\t6. Return to main-menu.\n\t\t>> "

//Do while loop
var choice,count,str,value;
do {
    choice = input.question(prompt);
    if (choice == 6) {
        console.log('Thank you & goodbye! \n');

    } else if (choice == 1) {
        for (count = 0; count < memberList.arr.length; count++) {
            console.log(memberList.disInfo(count));
        }
        //loops through all members

    } else if (choice == 2) {
        var str = input.question("Please enter member\'s name: ");
        str = memberList.rename(str);
        console.log(memberList.searchMem(str));
        //uses finding, searchmem, disinfo

    } else if (choice == 3) {
        value = false;
        var valid;
        //validates name entered, then checks whether member's name exists in database
        do{
            do{
                str = input.question("Please enter member\'s name: ");
                if(str.length==0|| !(str.match(/^[A-Za-z\s]+$/))){
                    console.log('Please enter a valid name.\n')
                    valid=false
                }else{
                    valid=true
                }
            }while(valid==false)
            
            str = memberList.rename(str);
            if(memberList.finding(str)== "false"){
                value = true;
            } else{
                console.log("\nMember\'s name exists in database. Please enter a new name.");
            }
        }while(value == false);
        //checks if members name is in data base then proceeds to ask birth month
        value = input.question('Please enter member\'s date of birth: ');
        //add member to database
        memberList.opt3(str,value);

    } else if (choice == 4) {
        str = input.question("Please enter member\'s name: ");
        str = memberList.rename(str);
        value = memberList.finding(str);
        if(isNaN(value)){
            console.log("Member does not exist.");
            //check whether member exists
        }else{
            do{
                var money = input.question("Please enter amount spent: $");
                if (!(money.match(/^([0-9]*[.])?[0-9]+$/))){
                    console.log('Please enter a valid input.')
                } else{
                    memberList.arr[value].points += memberList.convert(money);
                }
            }while(!(money.match(/^([0-9]*[.])?[0-9]+$/)));     
            memberList.changeType(value);
        }
        //check whether the money entered is actually numbers, then uses change type function to change membership type of member
    } else if (choice == 5) {
        do{
            value = input.question(opt5Prompt);
            console.log(memberList.opt5(value));
        }while(value!=6)

    } else if(choice == 7){
        //opt 7: creative component
        //chacks if member exists, and if they do removes member from group
        var str = input.question("Please enter member\'s name: ");
        str = memberList.rename(str);
        value = memberList.finding(str);
        if(value =="false"){
            console.log("Member does not exist")//check if member exists
        }else{
            memberList.arr.splice(value,1);//remove member
            console.log('[Removed]')
        }       
    }else if(choice == 8){
        console.log(memberList.opt8(memberList.rename(input.question("Please enter member\'s name: "))))//option 8
    }else {
        console.log('Please enter a valid input. \n');
        
    }

} while (choice != 6);
