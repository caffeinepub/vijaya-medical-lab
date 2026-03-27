import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";



actor {
  type BookTestSubmission = {
    name : Text;
    phone : Text;
    testType : Text;
    timestamp : Time.Time;
  };

  type ContactSubmission = {
    name : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  var bookTestId = 0;
  var contactId = 0;

  let bookTestSubmissions = Map.empty<Nat, BookTestSubmission>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();

  public shared ({ caller }) func submitBookTest(name : Text, phone : Text, testType : Text) : async Nat {
    let submission : BookTestSubmission = {
      name;
      phone;
      testType;
      timestamp = Time.now();
    };
    let id = bookTestId;
    bookTestSubmissions.add(id, submission);
    bookTestId += 1;
    id;
  };

  public shared ({ caller }) func submitContact(name : Text, phone : Text, message : Text) : async Nat {
    let submission : ContactSubmission = {
      name;
      phone;
      message;
      timestamp = Time.now();
    };
    let id = contactId;
    contactSubmissions.add(id, submission);
    contactId += 1;
    id;
  };

  public query ({ caller }) func getAllBookTestSubmissions() : async [(Nat, BookTestSubmission)] {
    bookTestSubmissions.toArray();
  };

  public query ({ caller }) func getAllContactSubmissions() : async [(Nat, ContactSubmission)] {
    contactSubmissions.toArray();
  };
};
