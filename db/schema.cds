namespace demo.actions;

entity Approver {
  key ID                : UUID;
  Name                  : String;
  Surname               : String;
  email                 : String;
  value_limit           : Integer;
}
