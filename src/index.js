import createTestCafe from 'testcafe';

export const run = async () => {
  let testcafe = null;

  console.log('Running testcafe via node api');
  console.log('TEST_FILE is', process.env.TEST_FILE);
  console.log(
    'TS_TARGET for Testcafe compiler options is',
    process.env.TS_TARGET
  );

  await createTestCafe()
    .then((tc) => {
      testcafe = tc;
      const runner = testcafe.createRunner();
      return runner
        .src([process.env.TEST_FILE])
        .compilerOptions(
          process.env.TS_TARGET
            ? {
                typescript: {
                  target: process.env.TS_TARGET,
                },
              }
            : undefined
        )
        .browsers('chrome:headless -incognito')
        .run();
    })
    .then(async (failedCount) => {
      await testcafe.close();
      process.exit(failedCount ? 1 : 0);
    })
    .catch((e) => {
      console.log(e);
      process.exit(1);
    });
};

run();
