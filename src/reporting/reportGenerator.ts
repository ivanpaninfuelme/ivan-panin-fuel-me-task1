import { USERS_URL, POSTS_URL } from "../constants/fetch_urls";
import { fetchData } from "../utils/fetchData";
import type { User, Post, UserWithPosts } from "../structure/userPost";
import { initLogger } from "../utils/logger";

export class ReportGenerator {

  private users: User[] = [];
  private posts: Post[] = [];

  private logger = initLogger();

  async loadJSONdata(userId?: number): Promise<void> {
  
        try {
            this.logger.DataFetching("Start fetching JSON...");

            //  userId is passed? 
            const usersUrl = userId ? USERS_URL + "?id=" + userId : USERS_URL;
            const postsUrl = userId ? POSTS_URL+ "?userId=" + userId : POSTS_URL;

            this.users = await fetchData<User[]>(usersUrl);
            this.posts = await fetchData<Post[]>(postsUrl);

            /* 
            // can also write this with promise.all: 
            const usersPromise = fetchData<User[]>(usersUrl);
            const postsPromise = fetchData<Post[]>(postsUrl);
            [this.users, this.posts] = await Promise.all([usersPromise, postsPromise]);*/ 
            
            this.logger.DataFetching("Fetched data; number of users/posts = " + this.users.length + "/" + this.posts.length);
                        
        } catch (err: any) {
            this.logger.Error("Failed to fetch data: " + err.message);
            throw err;
        }
    }

    public generateReportAll(userId?: number): UserWithPosts[] {

        this.logger.Processing("Generating report...");

        if (!this.users.length || !this.posts.length) {
            this.logger.Error("There is no data for generating report!");
            throw new Error("There is no data for generating report!");
        }

        const report = this.users.map(user => {
            const userPosts = this.posts
                .filter(p => p.userId === user.id)
                .map(p => ({
                    id: p.id,
                    title: p.title,
                    body: p.body,
                }));

            return {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                posts: userPosts,
            };
        });
        
        this.logger.Processing("Report generation completed.");
        return report;
    }

    public prettyReport(report: UserWithPosts[]): void {

        this.logger.Processing("Printing report...");
        for (const user of report) {
            this.logger.Print("\n Posts for " + user.name);
            user.posts.forEach(post => {
                this.logger.Print(" - " + post.id + " [" + post.title + "]");
            });
        }
        this.logger.Processing("Report printed successfully.");
    }
}