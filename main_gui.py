# import tkinter as tk
# from tkinter import messagebox, ttk
# from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
# import pandas as pd
# import pickle
# import os
# import sklearn.ensemble._forest
# import sys  


# # Try to import metrics module
# try:
#     from metrics_graph_gui import get_metrics_text, get_confusion_matrix_figure, get_feature_importance_figure
# except ImportError:
#     def get_metrics_text(*args): return "Metrics module not found."
#     def get_confusion_matrix_figure(*args): return None
#     def get_feature_importance_figure(*args): return None

# # -------------------- Helper: Auto-Increment CSV Save --------------------
# def save_to_history_csv(file_path, data_dict):
#     try:
#         next_id = 1
#         if os.path.exists(file_path):
#             try:
#                 df_hist = pd.read_csv(file_path)
#                 if not df_hist.empty and "User ID" in df_hist.columns:
#                     max_id = pd.to_numeric(df_hist["User ID"], errors='coerce').max()
#                     if pd.notna(max_id):
#                         next_id = int(max_id) + 1
#             except Exception:
#                 next_id = 1
        
#         data_dict["User ID"] = next_id
#         cols = ["User ID"] + [k for k in data_dict.keys() if k != "User ID"]
#         new_row = pd.DataFrame([data_dict], columns=cols)
        
#         use_header = not os.path.exists(file_path)
#         new_row.to_csv(file_path, mode='a', header=use_header, index=False)
#         return next_id
#     except Exception as e:
#         messagebox.showerror("Save Error", f"Error saving history: {str(e)}")
#         return None

# # -------------------- Setup --------------------
# root = tk.Tk()
# root.title("Thalassemia & Iron Deficiency Predictor")
# root.geometry("650x950")
# root.configure(bg='lightyellow', cursor='hand2')

# if getattr(sys, 'frozen', False):
#     # যদি .exe হিসেবে রান হয়, তবে exe ফাইলটি যেখানে আছে সেই ফোল্ডার ধরবে
#     BASE_DIR = os.path.dirname(sys.executable)
# else:
#     # যদি সাধারণ python কোড হিসেবে রান হয়
#     BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# # বাকি সব আগের মতোই থাকবে
# model_path = os.path.join(BASE_DIR, 'thalassemia_model.pkl')
# test_data_path = os.path.join(BASE_DIR, 'thalassemia_test.csv')
# history_path = os.path.join(BASE_DIR, 'prediction_history.csv')

# model = None
# X_test = None
# y_test = None

# try:
#     if os.path.exists(model_path):
#         with open(model_path, 'rb') as f:
#             model = pickle.load(f)
#     else:
#         print("Model not found.")
# except Exception as e:
#     messagebox.showerror("Model Error", f"Failed to load model: {e}")

# try:
#     if os.path.exists(test_data_path):
#         test_df = pd.read_csv(test_data_path)
#         X_test = test_df.drop(['Prediction'], axis=1, errors='ignore')
#         y_test = test_df['Prediction'] if 'Prediction' in test_df.columns else None
# except PermissionError:
#     messagebox.showerror("File Error", "Test data file is open. Please close it.")

# # -------------------- Input Frame --------------------
# frame = tk.Frame(root, bg='lightyellow')
# frame.pack(pady=10, fill='x', padx=10)

# def create_input(label_text, parent=frame):
#     tk.Label(parent, text=label_text, bg='lightyellow').pack(anchor='w')
#     entry = tk.Entry(parent)
#     entry.pack(fill='x')
#     return entry

# # --- Demographics ---
# demographics_frame = tk.Frame(frame, bg='lightyellow')
# demographics_frame.pack(fill='x', pady=(0, 10))

# tk.Label(demographics_frame, text="Age", bg='lightyellow').pack(anchor='w')
# age_entry = tk.Entry(demographics_frame)
# age_entry.pack(fill='x')

# tk.Label(demographics_frame, text="Gender", bg='lightyellow').pack(anchor='w', pady=(5,0))
# gender_var = tk.StringVar()
# gender_combo = ttk.Combobox(demographics_frame, textvariable=gender_var, values=["Male", "Female"], state="readonly")
# gender_combo.pack(fill='x')

# tk.Label(frame, text=" Data and Queries", bg='lightyellow', fg='gray').pack(pady=5)

# hb_entry = create_input("Hemoglobin (Hb)")
# mcv_entry = create_input("MCV")
# mch_entry = create_input("MCH")
# rdw_entry = create_input("RDW")
# rbc_entry = create_input("RBC Count")

# # --- Fatigue Frequency (Unified Input) ---
# tk.Label(frame, text="Fatigue Frequency", bg='lightyellow').pack(anchor='w', pady=(10,0))

# # Define options mapping
# fatigue_options = {
#     "None": 0,
#     "Everyday": 1,
#     "Every 3 days": 2,
#     "Once a week": 3,
#     "Once in 15 days": 4
# }
# fatigue_combo = ttk.Combobox(frame, values=list(fatigue_options.keys()), state="readonly")
# fatigue_combo.pack(fill='x')
# fatigue_combo.current(0) # Default to None

# # --- Family History ---
# family_var = tk.StringVar(value="No")
# tk.Label(frame, text="Family History of Thalassemia?", bg='lightyellow').pack(anchor='w', pady=(10,0))
# family_combo = ttk.Combobox(frame, textvariable=family_var, values=["Yes", "No"], state="readonly")
# family_combo.pack(fill='x')

# relation_container = tk.Frame(frame, bg='lightyellow')
# relation_label = tk.Label(relation_container, text="Relation with affected person", bg='lightyellow')
# relation_combo = ttk.Combobox(relation_container, values=[
#     "Parent", "Son/Daughter", "1 Sibling", "2 Siblings", "Grandparents", "Cousin", "Aunt/Uncle"
# ], state="readonly")

# def show_relation(*args):
#     if family_var.get() == "Yes":
#         relation_container.pack(after=family_combo, fill='x', pady=(0, 5))
#         relation_label.pack(anchor='w')
#         relation_combo.pack(fill='x')
#     else:
#         relation_container.pack_forget()

# family_var.trace("w", show_relation)

# # Other indicators
# jaundice_var = tk.IntVar()
# spleen_chole_var = tk.IntVar()

# check_frame = tk.Frame(frame, bg='lightyellow')
# check_frame.pack(pady=10, fill='x')

# tk.Checkbutton(check_frame, text="Jaundice", variable=jaundice_var, bg='lightyellow').pack(anchor='w')
# tk.Checkbutton(check_frame, text="Splenomegaly or Cholelithiasis", variable=spleen_chole_var, bg='lightyellow').pack(anchor='w')

# # -------------------- Submit Function --------------------
# def submit():
#     if model is None:
#         messagebox.showerror("Error", "Model not loaded properly.")
#         return

#     try:
#         # 1. Demographics
#         try:
#             age = int(age_entry.get().strip())
#         except ValueError:
#             raise ValueError("Age must be a valid number.")
#         gender = gender_var.get()
#         if not gender: raise ValueError("Please select a Gender.")

#         # 2. Lab Values
#         def safe_float(entry, name):
#             val = entry.get().strip()
#             if val == "": return 0.0
#             return float(val)

#         hb = safe_float(hb_entry, "Hemoglobin")
#         mcv = safe_float(mcv_entry, "MCV")
#         mch = safe_float(mch_entry, "MCH")
#         rdw = safe_float(rdw_entry, "RDW")
#         rbc = safe_float(rbc_entry, "RBC Count")

#         # 3. Categorical Processing
        
#         # Fatigue: Get value from map directly
#         selected_fatigue = fatigue_combo.get()
#         if not selected_fatigue: selected_fatigue = "None"
#         fatigue_freq_value = fatigue_options[selected_fatigue]

#         # Family Relation
#         rel_idx = relation_combo.current()
#         family_relation_value = rel_idx + 1 if (family_var.get() == "Yes" and rel_idx != -1) else 0

#         # 4. Indices
#         mentzer_index = round(mcv / rbc, 2) if rbc > 0 else 0
#         green_king_index = round(((mcv ** 2) * rdw) / (hb * 100), 2) if hb > 0 else 0

#         # 5. Prepare Features (Order must match Excel/CSV exactly)
#         feature_names = [
#             "Hb", "MCV", "MCH", "RDW", "RBC",
#             "Fatigue Frequency", 
#             "Family Relation",
#             "Jaundice", 
#             "Splenomegaly or Cholelithiasis",
#             "Mentzer Index", "Green King Index"
#         ]

#         model_features = pd.DataFrame([[
#             hb, mcv, mch, rdw, rbc,
#             fatigue_freq_value, 
#             family_relation_value,
#             jaundice_var.get(), 
#             spleen_chole_var.get(),
#             mentzer_index, green_king_index
#         ]], columns=feature_names)

#         prob = model.predict_proba(model_features)[0][1]

#         # --- Thalassemia Logic ---
#         if prob >= 0.80:
#             thal_result = "Thalassemia Minor"
#             thal_color = "red"
#         elif prob >= 0.55:
#             thal_result = "Likely Thalassemia Minor"
#             thal_color = "orange"
#         else:
#             thal_result = "Normal Healthy"
#             thal_color = "green"

#         # --- Iron Deficiency Logic ---
#         if gender == "Male" and age >= 15:
#             hb_threshold = 13.0
#         else:
#             hb_threshold = 12.0

#         iron_result = "No Iron Deficiency"
#         iron_color = "green"

#         if (hb <= hb_threshold and mch < 24 and rdw >= 15 and mentzer_index >= 15 and
#             green_king_index <= 65 and rbc < 6 and prob < 0.6):
#             iron_result = "Iron Deficiency Positive"
#             iron_color = "red"
#         elif (hb < hb_threshold and mch < 27 and rdw > 14 and mentzer_index >= 14 and
#               green_king_index <= 64 and prob > 0.5):
#             iron_result = "Likely Iron Deficiency"
#             iron_color = "orange"
#         elif (hb < (hb_threshold + 1) and prob > 0.75 and rbc > 5 and rdw > 15 and mch < 25 and
#               mentzer_index < 13 and green_king_index < 65):
#             iron_result = "Likely Iron Deficiency"
#             iron_color = "orange"

#         # 6. Save Data
#         save_data = {
#             "Age": age,
#             "Gender": gender,
#             "Hb": hb, "MCV": mcv, "MCH": mch, "RDW": rdw, "RBC": rbc,
#             "Fatigue Frequency": fatigue_freq_value,
#             "Family Relation": family_relation_value,
#             "Jaundice": jaundice_var.get(),
#             "Splenomegaly or Cholelithiasis": spleen_chole_var.get(),
#             "Mentzer Index": mentzer_index,
#             "Green King Index": green_king_index,
#             "Probability": prob,
#             "Thalassemia Result": thal_result,
#             "Iron Deficiency Result": iron_result
#         }

#         generated_id = save_to_history_csv(history_path, save_data)

#         # 7. Show Result
#         result_window = tk.Toplevel(root)
#         result_window.title(f"Result (ID: {generated_id})")
#         result_window.geometry("500x300")
#         result_window.configure(bg='lightyellow')

#         tk.Label(result_window, text=f"Patient ID: {generated_id}", font=('Arial', 12), fg="blue", bg='lightyellow').pack(anchor='w', padx=10, pady=(10,0))
#         tk.Label(result_window, text=f"Demographics: {age} yrs, {gender}", font=('Arial', 10), fg="gray", bg='lightyellow').pack(anchor='w', padx=10)

#         tk.Label(result_window, text="Thalassemia Result:", font=('Arial', 14, 'bold'), bg='lightyellow').pack(anchor='w', padx=10, pady=(10,0))
#         tk.Label(result_window, text=thal_result, font=('Arial', 16, 'bold'), fg=thal_color, bg='lightyellow').pack(anchor='w', padx=20, pady=(0,10))

#         tk.Label(result_window, text="Iron Deficiency Result:", font=('Arial', 14, 'bold'), bg='lightyellow').pack(anchor='w', padx=10, pady=(10,0))
#         tk.Label(result_window, text=iron_result, font=('Arial', 16, 'bold'), fg=iron_color, bg='lightyellow').pack(anchor='w', padx=20, pady=(0,10))

#     except ValueError as e:
#         messagebox.showerror("Input Error", str(e))
#     except Exception as e:
#         messagebox.showerror("Critical Error", f"An unexpected error occurred: {e}")

# # -------------------- Metrics Buttons --------------------
# def show_metrics_and_cm():
#     if X_test is None or y_test is None:
#         messagebox.showerror("Data Error", "Test data not loaded correctly.")
#         return
#     window = tk.Toplevel(root)
#     window.title("Metrics and Confusion Matrix")
    
#     metrics_text = get_metrics_text(model, X_test, y_test)
#     tk.Label(window, text=metrics_text, justify='left', font=('Arial', 12)).pack(side='left', padx=10, pady=10)

#     fig = get_confusion_matrix_figure(model, X_test, y_test)
#     if fig:
#         canvas = FigureCanvasTkAgg(fig, master=window)
#         canvas.draw()
#         canvas.get_tk_widget().pack(side='left', padx=10, pady=10)

# def show_feature_importance():
#     if X_test is None:
#         messagebox.showerror("Data Error", "Test data not loaded correctly.")
#         return
#     window = tk.Toplevel(root)
#     window.title("Feature Importance")
#     fig = get_feature_importance_figure(model, X_test)
#     if fig:
#         canvas = FigureCanvasTkAgg(fig, master=window)
#         canvas.draw()
#         canvas.get_tk_widget().pack(fill='both', expand=True)

# tk.Button(root, text="Show Result", command=submit, bg='lightblue', width=20).pack(pady=10)
# tk.Button(root, text="Show Metrics & Confusion Matrix", command=show_metrics_and_cm, bg='lightblue', width=30).pack(pady=5)
# tk.Button(root, text="Show Feature Importance", command=show_feature_importance, bg='lightyellow', width=20).pack(pady=5)

# root.mainloop()


# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import pickle
# import pandas as pd
# import os

# app = FastAPI()

# # Enable CORS so Next.js can talk to this API
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load your model
# model_path = 'thalassemia_model.pkl'
# if os.path.exists(model_path):
#     with open(model_path, 'rb') as f:
#         model = pickle.load(f)
# else:
#     model = None

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
#     if not model:
#         raise HTTPException(status_code=500, detail="Model not loaded on server.")

#     # 1. Map Categorical Data (Matches your Tkinter logic)
#     fatigue_map = {"None": 0, "Everyday": 1, "Every 3 days": 2, "Once a week": 3, "Once in 15 days": 4}
#     relation_map = {"Parent": 1, "Son/Daughter": 2, "1 Sibling": 3, "2 Siblings": 4, "Grandparents": 5, "Cousin": 6, "Aunt/Uncle": 7, "None": 0}
    
#     fatigue_val = fatigue_map.get(data.fatigue, 0)
#     family_rel_val = relation_map.get(data.relation, 0) if data.family_history == "Yes" else 0

#     # 2. Calculate Indices
#     mentzer = round(data.mcv / data.rbc, 2) if data.rbc > 0 else 0
#     green_king = round(((data.mcv ** 2) * data.rdw) / (data.hb * 100), 2) if data.hb > 0 else 0

#     # 3. Prepare Features for Model
#     feature_names = ["Hb", "MCV", "MCH", "RDW", "RBC", "Fatigue Frequency", "Family Relation", "Jaundice", "Splenomegaly or Cholelithiasis", "Mentzer Index", "Green King Index"]
#     features = pd.DataFrame([[
#         data.hb, data.mcv, data.mch, data.rdw, data.rbc,
#         fatigue_val, family_rel_val, int(data.jaundice), int(data.spleen),
#         mentzer, green_king
#     ]], columns=feature_names)

#     # 4. Predict
#     prob = model.predict_proba(features)[0][1]
    
#     # Thalassemia Result
#     thal_result = "Normal"
#     if prob >= 0.80: thal_result = "Thalassemia Minor"
#     elif prob >= 0.55: thal_result = "Likely Thalassemia Minor"

#     return {
#         "probability": round(float(prob), 4),
#         "thalassemia_result": thal_result,
#         "mentzer_index": mentzer,
#         "green_king_index": green_king
#     }

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)