from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Use relative path for Vercel compatibility
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, 'thalassemia_model.pkl')
model = None

@app.on_event("startup")
def load_model():
    global model
    try:
        if os.path.exists(model_path):
            with open(model_path, 'rb') as f:
                model = pickle.load(f)
            print("✅ Model loaded successfully")
        else:
            print(f"❌ Model file not found at {model_path}")
    except Exception as e:
        print(f"❌ Error loading model: {e}")

class PatientData(BaseModel):
    age: int
    gender: str
    hb: float
    mcv: float
    mch: float
    rdw: float
    rbc: float
    fatigue: str
    family_history: str
    relation: str = "None"
    jaundice: bool
    spleen: bool

@app.post("/predict")
async def predict(data: PatientData):
    if model is None:
        load_model()
        if model is None:
            raise HTTPException(status_code=500, detail="Model file missing on server.")

    try:
        # 1. Calculations
        mentzer = round(data.mcv / data.rbc, 2) if data.rbc > 0 else 0
        green_king = round(((data.mcv ** 2) * data.rdw) / (data.hb * 100), 2) if data.hb > 0 else 0

        # 2. Mappings
        fatigue_map = {"None": 0, "Everyday": 1, "Every 3 days": 2, "Once a week": 3, "Once in 15 days": 4}
        rel_list = ["Parent", "Son/Daughter", "1 Sibling", "2 Siblings", "Grandparents", "Cousin", "Aunt/Uncle"]
        
        fatigue_val = fatigue_map.get(data.fatigue, 0)
        rel_val = 0
        if data.family_history == "Yes" and data.relation in rel_list:
            rel_val = rel_list.index(data.relation) + 1

        # 3. Model DataFrame (FIXED INDENTATION HERE)
        feature_names = [
            "Hb", "MCV", "MCH", "RDW", "RBC", 
            "Fatigue Frequency", "Family Relation", "Jaundice", 
            "Splenomegaly or Cholelithiasis", "Mentzer Index", "Green King Index"
        ]

        input_df = pd.DataFrame([[
            data.hb, data.mcv, data.mch, data.rdw, data.rbc,
            fatigue_val, rel_val, 
            1 if data.jaundice else 0, 
            1 if data.spleen else 0,
            mentzer, green_king
        ]], columns=feature_names)

        # 4. Predict
        prob = model.predict_proba(input_df)[0][1]
        percentage = round(float(prob) * 100, 2)
        
        thal_res = "Normal Healthy"
        if prob >= 0.80: thal_res = "Thalassemia Minor"
        elif prob >= 0.55: thal_res = "Likely Thalassemia Minor"

        # Iron logic
        hb_limit = 13.0 if (data.gender == "Male" and data.age >= 15) else 12.0
        iron_res = "Iron Deficiency Positive" if (data.hb <= hb_limit and mentzer >= 15) else "No Iron Deficiency"

        return {
            "thalassemia_result": thal_res,
            "iron_result": iron_res,
            "percentage": f"{percentage}%",
            "probability": prob,
            "mentzer_index": mentzer,
            "green_king_index": green_king
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import pickle
# import pandas as pd
# import os

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Use relative path for Vercel compatibility
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# model_path = os.path.join(BASE_DIR, 'thalassemia_model.pkl')
# model = None

# @app.on_event("startup")
# def load_model():
#     global model
#     try:
#         if os.path.exists(model_path):
#             with open(model_path, 'rb') as f:
#                 model = pickle.load(f)
#             print("✅ Model loaded successfully")
#         else:
#             print(f"❌ Model file not found at {model_path}")
#     except Exception as e:
#         print(f"❌ Error loading model: {e}")

# class PatientData(BaseModel):
#     age: int
#     gender: str
#     hb: float
#     mcv: float
#     mch: float
#     rdw: float
#     rbc: float
#     fatigue: str
#     family_history: str
#     relation: str = "None"
#     jaundice: bool
#     spleen: bool

# @app.post("/predict")
# async def predict(data: PatientData):
#     if model is None:
#         # Try loading again if it failed at startup
#         load_model()
#         if model is None:
#             raise HTTPException(status_code=500, detail="Model file missing on server.")

#     try:
#         # 1. Calculations
#         mentzer = round(data.mcv / data.rbc, 2) if data.rbc > 0 else 0
#         green_king = round(((data.mcv ** 2) * data.rdw) / (data.hb * 100), 2) if data.hb > 0 else 0

#         # 2. Mappings
#         fatigue_map = {"None": 0, "Everyday": 1, "Every 3 days": 2, "Once a week": 3, "Once in 15 days": 4}
#         rel_list = ["Parent", "Son/Daughter", "1 Sibling", "2 Siblings", "Grandparents", "Cousin", "Aunt/Uncle"]
        
#         fatigue_val = fatigue_map.get(data.fatigue, 0)
#         rel_val = 0
#         if data.family_history == "Yes" and data.relation in rel_list:
#             rel_val = rel_list.index(data.relation) + 1

#         # 3. Model DataFrame 
#         # WE EXCLUDE 'Age' and 'Gender' HERE because the model wasn't trained on them
#        feature_names = [
#               "Hb", "MCV", "MCH", "RDW", "RBC", 
#     "Fatigue Frequency", "Family Relation", "Jaundice", 
#     "Splenomegaly or Cholelithiasis", "Mentzer Index", "Green King Index"
# ]

# input_df = pd.DataFrame([[
#     data.hb, data.mcv, data.mch, data.rdw, data.rbc,
#     fatigue_val, rel_val, 
#     1 if data.jaundice else 0, 
#     1 if data.spleen else 0,
#     mentzer, green_king
# ]], columns=feature_names)

#         # 4. Predict
#         prob = model.predict_proba(input_df)[0][1]
#         percentage = round(float(prob) * 100, 2)
        
#         thal_res = "Normal Healthy"
#         if prob >= 0.80: thal_res = "Thalassemia Minor"
#         elif prob >= 0.55: thal_res = "Likely Thalassemia Minor"

#         # Age and Gender are only used for this Iron logic, NOT the model
#         hb_limit = 13.0 if (data.gender == "Male" and data.age >= 15) else 12.0
#         iron_res = "Iron Deficiency Positive" if (data.hb <= hb_limit and mentzer >= 15) else "No Iron Deficiency"

#         return {
#             "thalassemia_result": thal_res,
#             "iron_result": iron_res,
#             "percentage": f"{percentage}%",
#             "probability": prob,
#             "mentzer_index": mentzer,
#             "green_king_index": green_king
#         }
#     except Exception as e:
#         # Provides clearer error messages to the frontend
#         raise HTTPException(status_code=400, detail=str(e))