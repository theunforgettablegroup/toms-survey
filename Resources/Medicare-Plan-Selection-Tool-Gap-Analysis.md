# Medicare Plan Selection Tool Gap Analysis

Source document: [Medicare Plan Selection Tool - 2023-05-13.pdf](Resources/Medicare%20Plan%20Selection%20Tool%20-%202023-05-13.pdf)

## Summary

The PDF describes a Medicare decision aid that asks targeted questions, computes a weighted 0 to 100 score, and guides users toward one of three outcomes: Medicare-Medigap, Gray Area, or Medicare Advantage. The current app has the same broad shape, but the weighted business logic and several Medicare-specific guidance features are still incomplete.

## Requirements vs current implementation

| Requirement from PDF                                                                     | Current implementation                                                               | Gap                                                                     |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Help users choose between Original Medicare + Medigap + drug plan and Medicare Advantage | The app now presents three coverage outcomes and a coverage-focused landing page     | Mostly covered at the high level                                        |
| Provide directional guidance, not a binding recommendation                               | Results are framed as a coverage match and coverage paths                            | Mostly covered, but the disclaimer / guidance framing could be stronger |
| Use a weighted 0 to 100 score                                                            | The app computes and stores a numeric `outcome_score`                                | Covered structurally, but the weighting logic is still a placeholder    |
| Use the weighting as the core know-how of the tool                                       | Current score is based on normalized answer position                                 | Major gap: business weighting rules are not implemented                 |
| Ask about age                                                                            | Age exists as a free-text question                                                   | Partially covered, but not as a banded age input                        |
| Ask about general health                                                                 | General health is present                                                            | Covered                                                                 |
| Ask about chronic health conditions                                                      | Present                                                                              | Covered                                                                 |
| Ask about cancer history                                                                 | Present                                                                              | Covered                                                                 |
| Ask about family history of serious medical issues                                       | Present                                                                              | Covered                                                                 |
| Ask about durable medical equipment need                                                 | Present                                                                              | Covered                                                                 |
| Ask about recent inpatient rehab history                                                 | Not present                                                                          | Missing                                                                 |
| Ask about prescription medication use                                                    | Present                                                                              | Covered                                                                 |
| Ask about expected domestic travel                                                       | Present                                                                              | Covered                                                                 |
| Ask about out-of-pocket spending preference                                              | Present                                                                              | Covered                                                                 |
| Ask about provider flexibility                                                           | Present in multiple questions                                                        | Covered                                                                 |
| Ask about specialist referral flexibility                                                | Present                                                                              | Covered                                                                 |
| Ask about extra benefits such as dental/hearing/transportation                           | Present                                                                              | Covered                                                                 |
| Show or explain the score visually                                                       | Results are textual; no graph exists                                                 | Missing                                                                 |
| Show Medicare-Medigap / Gray Area / Medicare Advantage outputs                           | The app uses exactly these three outcomes                                            | Covered                                                                 |
| Explain that results are based on the current situation                                  | Results copy is generic and not explicitly Medicare-specific                         | Partially covered                                                       |
| Recommend consulting a local Medicare specialist who sells both plan types               | Not surfaced in the current result flow                                              | Missing                                                                 |
| Mention SHIP / SHIIP resources                                                           | Not surfaced                                                                         | Missing                                                                 |
| Mention Medicaid or other coordination options                                           | Not surfaced                                                                         | Missing                                                                 |
| Encourage annual review as circumstances change                                          | Not surfaced                                                                         | Missing                                                                 |
| Support email or print output                                                            | Not implemented                                                                      | Missing                                                                 |
| Support reminders for upcoming surgeries or changes                                      | Not implemented                                                                      | Missing                                                                 |
| Help users find local Medicare specialists                                               | Not implemented                                                                      | Missing                                                                 |
| Maintain a list of local agents                                                          | Not implemented                                                                      | Missing                                                                 |
| Preserve the framing that the tool is unbiased and not sales-driven                      | Privacy and coverage copy are neutral, but not explicit enough to match the PDF tone | Partially covered                                                       |

## Priority gaps

### 1. Weighted scoring model

This is the main functional gap. The PDF makes the weighting model the key differentiator. The current app uses a generic normalization of answer position, which is not equivalent to the business logic described in the source document.

### 2. Questionnaire completeness

The app covers most of the important health and preference questions, but it still lacks the rehab question and the age-band treatment shown in the PDF.

### 3. Medicare-specific guidance

The PDF wants the result to guide next steps, including specialist consultation, annual review, and resource references like SHIP / SHIIP. The current app has outcome copy, but not that level of Medicare decision support.

### 4. Utility features

Email, print, reminders, and specialist-finder features are all called out in the PDF as future or supporting capabilities. None are present today.

## Current implementation strengths

- The app already has a working landing page, survey flow, results view, and coverage outcomes.
- The app persists a computed score on each response.
- The app supports both free-text and single-choice questions.
- The app already uses deterministic ordering for questions and answers.
- The app now has a focus on extra medical coverage exploration instead of a generic survey.

## Recommended next step

Treat the current app as a structural shell for the Medicare Plan Selection Tool. The next missing input is the business weighting model. Once that weighting is provided, the questionnaire scoring can be aligned to the PDF without changing the existing app architecture.
