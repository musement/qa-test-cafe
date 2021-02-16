import SearchPage from '../pages/search_page'

const searchPage = new SearchPage()

const baseUrl = process.env.BASE_URL

fixture `Search with Google`
  .page `${baseUrl}`
  .beforeEach(async t => {
    await t.maximizeWindow()
  })

test('Search for "Musement museums" on Google', async (t) => {
  await searchPage.insertCriteriaAndSearch()
  await searchPage.ensureFirstResultIsRelevantWithSearchCriteria()
});
