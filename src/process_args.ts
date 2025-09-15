/*
  test program za fuelmetask-1
  starts with: 
  npm test -- <operation> [userId]
*/

import { ReportGenerator } from "./reporting/reportGenerator";
import { USERS_URL, POSTS_URL } from "./constants/fetch_urls";
import { fetchData } from "./utils/fetchData";

const args = process.argv.slice(2);

// validate operations and args
const validOps = ["users", "user_info", "posts", "user_posts", "UserWithPosts"];
if (args.length < 1 || args.length > 2) {
  console.log("USAGE: <operation> [userId]");
  console.log("Operations allowed: users, user_info userId, posts, user_posts userId, UserWithPosts");
  process.exit(1);
}
const operation = args[0]!;
if (!validOps.includes(operation)) {
  console.log("Invalid operation: ${operation}");
  console.log("Valid operations:", validOps.join(", "));
  process.exit(1);
}

const needsUserId = ["user_info", "user_posts"];
let userId: string | undefined;

if (needsUserId.includes(operation)) {
  userId = args[1];
  if (!userId) {
    console.log("Operation " + operation + " requires a userId as the second argument.");
    process.exit(1);
  }
}

async function main() {
  switch (operation) {
    case "users":
      const users = await fetchData(USERS_URL);
      console.log("Users:", users);
      break;

    case "user_info":
      const userInfo = await fetchData(USERS_URL + "?id=" + userId);
      console.log("User ID ${userId}:", userInfo);
      break;

    case "posts":
      const posts = await fetchData("POSTS_URL");
      console.log("Posts:", posts);
      break;

    case "user_posts":
      const userPosts = await fetchData(POSTS_URL + "?userId=" + userId);
      console.log("Post for user ID ${userId}:", userPosts);
      break;

    case "UserWithPosts":
        const userPostGenerator = new ReportGenerator();

        let postsUserId: number | undefined;
        if (args[1])
            postsUserId = parseInt(args[1], 10);

        // get user/posts data
        await userPostGenerator.loadJSONdata(postsUserId);
        // generate (print) report
        const report = userPostGenerator.generateReportAll(postsUserId);
        console.log(JSON.stringify(report, null, 2));
        break;
  }
}

main().catch(err => console.error("Error:", err.message));
