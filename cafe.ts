/* eslint-env node */

import createTestCafe from "testcafe";

const run = async (
  fixtures: Array<string>,
  browsers: Array<string>,
  reporter: string,
  options: Object,
  isHeadlessMode: string
) => {
  let testcafe: TestCafe | null = null;
  let runner: Runner | null = null;

  if (isHeadlessMode === "true") {
    // https://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/createtestcafe.html
    await createTestCafe(
      "localhost",
      process.env.TEST_CAFE_PORT1
        ? parseInt(process.env.TEST_CAFE_PORT1)
        : 1330,
      process.env.TEST_CAFE_PORT2 ? parseInt(process.env.TEST_CAFE_PORT2) : 1331
    )
      .then((tc) => {
        testcafe = tc;
        runner = testcafe.createRunner();

        return (
          runner
            .src(fixtures)
            .browsers(browsers)
            .reporter(reporter)
            // https://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html#run
            .run(options)
        );
      })
      .then(async (failedCount) => {
        await testcafe!.close();
        process.exit(failedCount ? 1 : 0);
      })
      .catch((e) => {
        console.log(e);
        process.exit(1);
      });
  } else {
    await createTestCafe(
      "localhost",
      process.env.TEST_CAFE_PORT1
        ? parseInt(process.env.TEST_CAFE_PORT1)
        : 1330,
      process.env.TEST_CAFE_PORT2 ? parseInt(process.env.TEST_CAFE_PORT2) : 1331
    )
      .then((tc) => {
        testcafe = tc;
        runner = testcafe.createRunner();

        return testcafe.createBrowserConnection();
      })
      .then((remoteConnection) => {
        console.log(
          "Please open this URL on your browser to start the tests: " +
            remoteConnection.url
        );

        remoteConnection.once("ready", () => {
          runner
            ?.src(fixtures)
            .browsers(remoteConnection)
            .reporter(reporter)
            .run(options)
            .then(async (failedCount) => {
              await testcafe?.close();
              process.exit(failedCount ? 1 : 0);
            })
            .catch((e) => {
              console.log(e);
              process.exit(1);
            });
        });
      });
  }
};

export default {
  run,
};
