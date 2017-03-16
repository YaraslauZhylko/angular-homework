import { AngularHomeworkPage } from './app.po';

describe('angular-homework App', () => {
  let page: AngularHomeworkPage;

  beforeEach(() => {
    page = new AngularHomeworkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
