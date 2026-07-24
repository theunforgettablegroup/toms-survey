# Medicare Plan Selection Tool Scoring Requirements

Source workbook: [tool for evaluating Medicare health plans v5 - 2024-10-17 Chuck Wade - Had Cancer Major Still.xlsx](tool%20for%20evaluating%20Medicare%20health%20plans%20v5%20-%202024-10-17%20Chuck%20Wade%20-%20Had%20Cancer%20Major%20Still.xlsx)

## Scope

This file breaks the workbook's scoring logic into implementable requirements. The workbook uses Column C as the selected answer index for each question, but the answer entry column itself is not part of the requirements. The scoring model is based on a weighted sum of question contributions plus a small set of cap/override rules.

## Scoring model requirements

1. Each active question maps the selected answer index to a 0-100 score value.
2. Each question has a weight percentage.
3. The question contribution is calculated as `weight * mapped_score / 100`.
4. The final estimated score is the sum of the weighted contributions for the active questions.
5. Some questions apply override or cap rules that modify the final score after the weighted contribution is calculated.
6. Questions marked `DROPPED` in the workbook are not part of the scoring model.

## Question-by-question requirements

### 1. Age

- Question: What is your Age?
- Workbook status: `Top`
- Answer set:
  - 65-69 => 100
  - 70-79 => 40
  - 80-89 => 2
  - 90-over => 0
- Weight: 10%
- Requirement: include age in the scoring model.
- Override rule: if the user is age 80 or older, cap the overall final score at 45.
- Override rule: if the user is age 90 or older, cap the overall final score at 30.
- Requirement note: the age input should behave as a banded selector, not a free-text field.

### 2. General health

- Question: How is your General Health?
- Workbook status: `Top`
- Answer set:
  - Excellent => 100
  - Good => 50
  - Fair => 25
  - Poor => 10
- Weight: 5%
- Requirement: include general health in the scoring model with the listed score mapping.

### 3. Chronic health conditions

- Question: Do you have Chronic Health Conditions?
- Workbook status: `Top`
- Answer set:
  - None => 100
  - Minor => 25
  - Major => 0
- Weight: 10%
- Requirement: include chronic condition severity in the scoring model.

### 4. Cancer history

- Question: Do you have or have you had Cancer?
- Workbook status: `TOP`
- Answer set:
  - Never => 100
  - Minor-removed => 50
  - Minor-still => 20
  - Major-removed => 10
  - Major-still have it => 0
- Weight: 20%
- Requirement: include cancer history in the scoring model.
- Override rule: if the answer is `Major-still have it`, force the final answer to 10 no matter what other scoring would produce.
- Override rule: if the answer is `Major-removed`, reduce that answer's effect by half.
- Implementation note: this question appears to have precedence over other score components and should be treated as a high-impact override candidate.

### 5. Family history of serious medical issues

- Question: Is there a history of serious medical issues in your biological family?
- Workbook status: `NEW`
- Answer set:
  - None/Don't Know => 100
  - Minor => 50
  - Major => 0
- Weight: 10%
- Requirement: include family medical history in the scoring model.

### 6. Durable medical equipment need

- Question: Do you need Durable Medical Equipment? (such as wheelchair, oxygen, C-Pap)
- Workbook status: `TOP`
- Answer set:
  - No => 100
  - Yes-low-cost => 75
  - Yes-expensive => 0
- Weight: 5%
- Requirement: include durable medical equipment need in the scoring model.
- Override rule: if the user selects `Yes-expensive`, cap the overall final score at 20 unless a more severe override already applies.

### 7. Recent inpatient rehab history

- Question: Have you recently been an in-patient in a Rehab Facility?
- Workbook status: `TOP`
- Answer set:
  - Never => 100
  - Recently-minor => 60
  - Recently-major => 0
  - Yes-still in Rehab => 0
- Weight: 5%
- Requirement: include recent rehab history in the scoring model.
- Override rule: if the user selects `Recently-major` or `Yes-still in Rehab`, cap the overall final score at 15.

### 8. Prescription medication use

- Question: How is your use of Prescription Medications?
- Workbook status: `Low`
- Answer set:
  - Don't take any meds on regular basis => 100
  - Take few meds on regular basis => 50
  - Take several meds on regular basis => 25
  - Take several meds including some high cost specialty drugs => 10
- Weight: 3%
- Requirement: include prescription burden in the scoring model.

### 9. Domestic travel

- Question: Do you have Expected Domestic Travel during the year?
- Workbook status: `Middle`
- Answer set:
  - Expect no travel out of area => 100
  - Expect little travel out of area => 40
  - Expect some travel out of area => 10
  - Expect significant travel out of area such as seasonal vacations => 0
- Weight: 5%
- Requirement: include domestic travel expectations in the scoring model.
- Override rule: if the user expects significant travel during the year, cap the overall final score at 45.

### 10. Out-of-pocket spending preference

- Question: What is the Importance of Consistent Out-of-Pocket Spending Per Month?
- Workbook status: `Top`
- Answer set:
  - Lower monthly cost with possibility of high unexpected out-of-pocket spending (up to a maximum) => 100
  - Middle monthly cost with some unexpected out-of-pocket costs => 50
  - Consistent monthly cost with almost complete coverage for unexpected events or expected event coming within a year (i.e. peace of mind) => 0
- Weight: 10%
- Requirement: include cost predictability preference in the scoring model.

### 11. Primary care flexibility

- Question: What importance is the Ability to Choose Specific Primary Care Doctor or Clinic?
- Workbook status: `Middle`
- Answer set:
  - Not important => 100
  - Slightly important => 75
  - Moderately important => 25
  - Highly important => 10
  - Very highly important => 0
- Weight: 4%
- Requirement: include primary care provider flexibility in the scoring model.

### 12. Specialist / referral hospital flexibility

- Question: What is the importance of the Ability to Choose Specific Specialist and/or Referral Hospital (such as MD Anderson, Mayo Clinic)?
- Workbook status: `Top`
- Answer set:
  - Not important => 100
  - Slightly important => 75
  - Moderately important => 25
  - Highly important => 10
  - Very highly important => 0
- Weight: 5%
- Requirement: include specialist and referral hospital choice in the scoring model.
- Output note: if the user has a high concern here, the result may need to highlight plan-choice options more prominently.

### 13. Specialist without primary care referral

- Question: What is the importance of the Ability to go to Specialist without Going to Primary Care Doctor First?
- Workbook status: `Top`
- Answer set:
  - Not important => 100
  - Slightly important => 75
  - Moderately important => 25
  - Highly important => 10
  - Very highly important => 0
- Weight: 5%
- Requirement: include referral-free specialist access in the scoring model.

### 14. Extra benefits such as dental, hearing, and transportation

- Question: What is the importance of having a plan that includes additional benefits such as dental, hearing and transportation that are not covered by Original Medicare?
- Workbook status: `Top`
- Answer set:
  - Not important => 0
  - Slightly important => 10
  - Moderately important => 25
  - Highly important => 50
  - Very highly important => 100
- Weight: 3%
- Requirement: include extra-benefit preference in the scoring model.
- Output note: flag that the user may need to pick the right Medicare Advantage plan.

## Dropped questions not part of the scoring model

The workbook marks the following questions as `DROPPED`, so they should not be included in the scoring implementation unless the requirements change later:

- Any issues with chronic pain?
- Expected foreign travel during the year
- Importance of plan including prescription drug coverage instead of having separate Medicare Part D Plan
- Importance of being able to switch to original Medicare+Medigap in the future if desired

## Output requirements

1. The final score should be the sum of the weighted question contributions.
2. The final score should remain within the 0 to 100 range after all caps and overrides.
3. The app should continue to map the final score into the three outcomes:
   - Medicare-Medigap
   - Gray Area
   - Medicare Advantage
4. The scoring implementation should preserve any override precedence implied by the workbook notes, especially for cancer, rehab, age, domestic travel, and DME.

## Open interpretation items

The workbook contains a few notes that suggest business rules but do not fully define implementation order. These should be clarified before coding if exact behavior is important:

- Whether the cancer override of `Major-still have it => 10` should be a direct final-score override or only a per-question override.
- Whether the `Major-removed => half` rule should halve the raw score, the weighted contribution, or the overall final score.
- Whether the age, travel, DME, and rehab cap rules should be applied before or after summing all weighted contributions.

## Related non-scoring context from the workbook

The `Medical Manager` sheet does not define scoring rules, but it explains the intended meaning of the two main plan families:

- Medicare-Medigap emphasizes broad provider access and less medical management.
- Medicare Advantage emphasizes managed care, networks, and cost control.

This context is useful for result copy and explanation text, but it is separate from the scoring rules above.
