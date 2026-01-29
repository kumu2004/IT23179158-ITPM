import { test, expect } from "@playwright/test";

// Increase navigation timeout for all tests in this file
test.use({ navigationTimeout: 60000 });

const testCases = [
  {
    id: "Pos_Fun_0001",
    name: "Greeting phrase",
    input: "oyaa suvendha?",
    expected: "ඔයා සුවෙන්ද?",
  },
  {
    id: "Pos_Fun_0002",
    name: "Mixed-language input",
    input: "sahoo mata adha interview ekak thiyenavaa",
    expected: "සහෝ මට අද interview එකක් තියෙනවා",
  },
  {
    id: "Pos_Fun_0003",
    name: "Short request",
    input: "maava gedhara gihin dhaanna puLuvandha?",
    expected: "මාව ගෙදර ගිහින් දාන්න පුළුවන්ද?",
  },
  {
    id: "Pos_Fun_0004",
    name: "Simple sentence",
    input: "mama gamata yanavaa",
    expected: "මම ගමට යනවා",
  },
  {
    id: "Pos_Fun_0005",
    name: "Compound sentence",
    input: "mama adha malagedhara yanavaa, heta ennam",
    expected: "මම අද මලගෙදර යනවා, හෙට එන්නම්",
  },
  {
    id: "Pos_Fun_0006",
    name: "Question sentence",
    input: "oyaa mokatadha gahannee?",
    expected: "ඔයා මොකටද ගහන්නේ?",
  },
  {
    id: "Pos_Fun_0007",
    name: "Imperative",
    input: "venasa penvanna",
    expected: "වෙනස පෙන්වන්න",
  },
  {
    id: "Pos_Fun_0008",
    name: "Polite phrase",
    input: "karuNaakaralaa udata enna",
    expected: "කරුණාකරලා උඩට එන්න",
  },
  {
    id: "Pos_Fun_0009",
    name: "Negative sentence",
    input: "mama arinnee naehae",
    expected: "මම අරින්නේ නැහැ",
  },
  {
    id: "Pos_Fun_0010",
    name: "Long sentence",
    input: "amal adha amuthu vidhihata naetuvaa",
    expected: "අමල් අද අමුතු විදිහට නැටුවා",
  },
  {
    id: "Pos_Fun_0011",
    name: "Thanks phrase",
    input: "obata Nayagaethiyi",
    expected: "ඔබට ණයගැතියි",
  },
  {
    id: "Pos_Fun_0012",
    name: "Apology phrase",
    input: "mata samaavenna",
    expected: "මට සමාවෙන්න",
  },
  {
    id: "Pos_Fun_0013",
    name: "Instruction sentence",
    input: "histhaen puravanna",
    expected: "හිස්තැන් පුරවන්න",
  },
  {
    id: "Pos_Fun_0014",
    name: "Request sentence",
    input: "mata tikak dhenna puLuvandha?",
    expected: "මට ටිකක් දෙන්න පුළුවන්ද?",
  },
  {
    id: "Pos_Fun_0015",
    name: "Future tense",
    input: "mama labana sathiyee kiyannam",
    expected: "මම ලබන සතියේ කියන්නම්",
  },
  {
    id: "Pos_Fun_0016",
    name: "Past tense",
    input: "mata amaaruvak thibbaa",
    expected: "මට අමාරුවක් තිබ්බා",
  },
  {
    id: "Pos_Fun_0017",
    name: "Emotional phrase",
    input: "mata harima appiriyayi",
    expected: "මට හරිම අප්පිරියයි",
  },
  {
    id: "Pos_Fun_0018",
    name: "Advice sentence",
    input: "dhinapathaa udheeta dhuvannaa",
    expected: "දිනපතා උදේට දුවන්න",
  },
  {
    id: "Pos_Fun_0019",
    name: "Motivation",
    input: "obata eya uda dhaemiya haekiyi",
    expected: "ඔබට එය උඩ දැමිය හැකියි",
  },
  {
    id: "Pos_Fun_0020",
    name: "Simple chat",
    input: "mokakdha arinnee?",
    expected: "",
  },
  {
    id: "Pos_Fun_0021",
    name: "Polite request",
    input: "karuNakaralaa arinna",
    expected: "කරුණකරලා අරින්න",
  },
  {
    id: "Pos_Fun_0022",
    name: "Simple answer",
    input: "hoDHAyi",
    expected: "හොඳයි",
  },
  {
    id: "Pos_Fun_0023",
    name: "Simple negative",
    input: "kaethayi",
    expected: "කැතයි",
  },
  {
    id: "Pos_Fun_0024",
    name: "Simple thanks",
    input: "sthuthiyi",
    expected: "ස්තුතියි",
  },
];

test.describe("Positive Functional Tests", () => {
  for (const tc of testCases) {
    test(`${tc.id} - ${tc.name}`, async ({ page }) => {
      await page.goto("https://www.swifttranslator.com/", {
        waitUntil: "networkidle",
      });
      const inputArea = page.getByPlaceholder("Input Your Singlish Text Here.");
      const inputSelector =
        'textarea[placeholder="Input Your Singlish Text Here."]';
      await page.fill(inputSelector, "");
      await inputArea.click();
      await inputArea.pressSequentially(tc.input, { delay: 35 });
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        el.dispatchEvent(
          new CompositionEvent("compositionend", {
            bubbles: true,
            cancelable: true,
            data: (el as HTMLTextAreaElement).value,
          }),
        );
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }, inputSelector);
      const outputBox = page.locator('.card:has-text("Sinhala") .bg-slate-50');
      await expect(outputBox).toContainText(tc.expected, { timeout: 10000 });
      const output = await outputBox.textContent();
      expect(output).toContain(tc.expected);
      await page.close();
    });
  }
});
