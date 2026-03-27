import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile type for frontend integration
  public type UserProfile = {
    name : Text;
  };

  // Persisted ID counters (shared mutable var)
  var nextContactId = 0;

  // Persisted Maps
  let userProfiles = Map.empty<Principal, UserProfile>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get caller user profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user: Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Internal persisted type
  type ContactSubmission = {
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // Public write functions - anyone can submit contact form
  public shared ({ caller }) func submitContact(name : Text, phone : Text, email : Text, message : Text) : async () {
    let id = nextContactId;
    let submission : ContactSubmission = {
      name;
      phone;
      email;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(id, submission);
    nextContactId += 1;
  };

  // Admin-only read functions - protect sensitive data
  public query ({ caller }) func getAllContactSubmissions() : async [(Nat, ContactSubmission)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all contact submissions");
    };
    contactSubmissions.toArray();
  };
};
