# Test Engine Playwright demo

A tiny todo app with a Playwright suite that reports to Buildkite Test Engine.

The suite includes a deliberately slow test and a deliberately flaky test
(fails about 30% of the time), so Test Engine has timings and flakiness to show.
Set `FLAKY_RATE=0` to turn the flaky test off.

## Run locally

```bash
npm install
npx playwright install chromium
npx playwright test
```

## Run in Buildkite

1. Push this folder to a new GitHub repository.
2. In Buildkite, go to **Test Suites > New test suite** and copy its API token.
3. Make the token available to your agent as `BUILDKITE_ANALYTICS_TOKEN`
   (a cluster secret, or an agent `environment` hook).
4. Create a pipeline for the repository using the default upload step,
   which loads `.buildkite/pipeline.yml`.
5. Run a few builds. Results appear under the test suite in Test Engine.
