using {demo.actions as my} from '../db/schema';

service demoactions @(path : '/api/v1') {

entity Approver as projection on my.Approver;

function chooseApprover(value : Integer) returns String;

}
