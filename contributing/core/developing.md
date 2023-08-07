# Developing

- The development branch is `canary`.
- All pull requests should be opened against `canary`.

To develop locally:

1. Install the [GitHub CLI](https://github.com/cli/cli#installation).
2. Clone the Next.js repository (download only recent commits for faster clone):

   ```sh
   gh repo clone d-one-company/kirin -- --depth=3000 --branch canary --single-branch
   ```

3. Create a new branch:

   ```sh
   git checkout -b MY_BRANCH_NAME origin/canary
   ```

4. Enable pnpm:

   ```sh
   corepack enable pnpm
   ```

5. Install the dependencies with:

   ```sh
   pnpm install
   ```

6. Start developing and watch for code changes:

   ```sh
   pnpm dev
   ```

7. When your changes are finished, commit them to the branch:

   ```sh
   git add .
   git commit -m "DESCRIBE_YOUR_CHANGES_HERE"
   ```

8. To open a pull request you can use the GitHub CLI which automatically forks and sets up a remote branch. Follow the prompts when running:

   ```sh
   gh pr create
   ```
