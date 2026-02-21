import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type Progress = {
    percentage : Nat;
    timestamp : Nat;
  };

  type Task = {
    id : Nat;
    title : Text;
    description : Text;
    dueDate : Time.Time;
    completed : Bool;
    priority : Text;
  };

  type Project = {
    id : Nat;
    name : Text;
    status : Text;
    githubLink : Text;
    techStack : [Text];
  };

  type MockTest = {
    id : Nat;
    name : Text;
    score : Nat;
    date : Time.Time;
  };

  type TimelineDay = {
    date : Time.Time;
    topics : [Text];
    completed : Bool;
  };

  type UserProfile = {
    name : Text;
    email : Text;
  };

  module Task {
    public func compare(task1 : Task, task2 : Task) : Order.Order {
      Nat.compare(task1.id, task2.id);
    };
  };

  module Project {
    public func compare(project1 : Project, project2 : Project) : Order.Order {
      Nat.compare(project1.id, project2.id);
    };
  };

  module MockTest {
    public func compare(mockTest1 : MockTest, mockTest2 : MockTest) : Order.Order {
      Nat.compare(mockTest1.id, mockTest2.id);
    };
  };

  module TimelineDay {
    public func compare(timelineDay1 : TimelineDay, timelineDay2 : TimelineDay) : Order.Order {
      switch (Int.compare(timelineDay1.date, timelineDay2.date)) {
        case (#equal) { timelineDay1.topics.compare(timelineDay2.topics) };
        case (order) { order };
      };
    };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let tasks = Map.empty<Nat, Task>();
  let projects = Map.empty<Nat, Project>();
  let mockTests = Map.empty<Nat, MockTest>();
  let timelineDays = List.empty<TimelineDay>();

  var nextTaskId = 1;
  var nextProjectId = 1;
  var nextMockTestId = 1;

  // User Profile Module
  public shared ({ caller }) func getProfile() : async UserProfile {
    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?profile) { profile };
    };
  };

  // Task Module
  public shared ({ caller }) func createTask(title : Text, description : Text, dueDate : Time.Time, priority : Text) : async Task {
    let task = {
      id = nextTaskId;
      title;
      description;
      dueDate;
      completed = false;
      priority;
    };
    tasks.add(nextTaskId, task);
    nextTaskId += 1;
    task;
  };

  public shared ({ caller }) func updateTask(id : Nat, title : Text, description : Text, dueDate : Time.Time, priority : Text) : async Task {
    switch (tasks.get(id)) {
      case (null) { Runtime.trap("Task not found") };
      case (?existing) {
        let updated = {
          id = existing.id;
          title;
          description;
          dueDate;
          completed = existing.completed;
          priority;
        };
        tasks.add(id, updated);
        updated;
      };
    };
  };

  public shared ({ caller }) func deleteTask(id : Nat) : async () {
    if (not tasks.containsKey(id)) {
      Runtime.trap("Task not found");
    };
    tasks.remove(id);
  };

  public shared ({ caller }) func markTaskComplete(id : Nat) : async () {
    switch (tasks.get(id)) {
      case (null) { Runtime.trap("Task not found") };
      case (?task) {
        let updated = { id = task.id; title = task.title; description = task.description; dueDate = task.dueDate; completed = true; priority = task.priority };
        tasks.add(id, updated);
      };
    };
  };

  public query ({ caller }) func getAllTasks() : async [Task] {
    tasks.values().toArray().sort();
  };

  // Project Module
  public shared ({ caller }) func addProject(name : Text, githubLink : Text, techStack : [Text]) : async Project {
    let project = {
      id = nextProjectId;
      name;
      status = "Planning";
      githubLink;
      techStack;
    };
    projects.add(nextProjectId, project);
    nextProjectId += 1;
    project;
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    projects.values().toArray().sort();
  };

  // Mock Test Module
  public shared ({ caller }) func addMockTest(name : Text, score : Nat, date : Time.Time) : async MockTest {
    let test = {
      id = nextMockTestId;
      name;
      score;
      date;
    };
    mockTests.add(nextMockTestId, test);
    nextMockTestId += 1;
    test;
  };

  public query ({ caller }) func getAllMockTests() : async [MockTest] {
    mockTests.values().toArray().sort();
  };

  // Timeline Module
  public shared ({ caller }) func addTimelineDay(date : Time.Time, topics : [Text]) : async TimelineDay {
    let day = {
      date;
      topics;
      completed = false;
    };
    timelineDays.add(day);
    day;
  };

  public query ({ caller }) func getTimeline() : async [TimelineDay] {
    timelineDays.toArray().sort();
  };
};
