import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pickle

# 1. Load dataset (Make sure to point to your updated csv/excel)
df = pd.read_csv(r"c:\Users\mdlit\Desktop\Ai project\code\thalassemia_data.csv")

# 2. Define features and target
X = df.drop(columns=["Prediction"])
y = df["Prediction"]

# 3. Split into train (80%) and test (20%)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 4. Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 5. Save trained model
with open(r"c:\Users\mdlit\Desktop\Ai project\code\thalassemia_model.pkl", "wb") as f:
    pickle.dump(model, f)

# 6. Save test data as CSV for GUI
test_df = pd.DataFrame(X_test)
test_df["Prediction"] = y_test.values
test_df.to_csv(r"c:\Users\mdlit\Desktop\Ai project\code\thalassemia_test.csv", index=False)

print("✅ Model trained and saved successfully!")